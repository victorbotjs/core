import IBot from "../interfaces/IBot"
import ICommand from "../interfaces/ICommand";
import { IDiscordMiddleware } from "../interfaces/IDiscordMiddleware";
import IMiddleware from "../interfaces/IMiddleware";
import { ITwitchMiddleware } from "../interfaces/ITwitchMiddleware";
import { BotOptions } from "../types/BotOptions";
import { CommandCollection } from "../types/CommandCollection";

export class BotCore implements IBot {
  _isRunning = false;
  _middleware?: ITwitchMiddleware[] | IDiscordMiddleware[];
  _commands: CommandCollection = {};
  _prefix: string;
  _client: any;
  _options: BotOptions = {};

  constructor(prefix: string, options: BotOptions, commandsDir?: string) {
    this._prefix = prefix;
    if(options) {
      this._options = options;
    }
    //TODO: load commands from commandsDir


  }

  run() {
    if(this._isRunning === true) {
      console.warn("Bot is already running...")
      return
    }

    if(this._options.onReady !== undefined) {
      // @ts-ignore TODO: (@bmorrisondev) Figure out how to fix this
      this._client.on("on", this._options.onReady)
    }
    this._client.on("message", this.handleMessage)
    this._client.connect()
    this._isRunning = true;
  }

   use(middleware: IMiddleware) {
      if(this._middleware === undefined) {
        this._middleware = new Array<IMiddleware>()
      }
      this._middleware.push(middleware)
    }

  addCommand(command: ICommand) {
    this._commands[command.commandText] = command;
  }

  handleMessage(){
    throw new Error("Must be implemented in subclass")
  }

}