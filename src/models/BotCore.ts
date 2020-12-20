import IBot from "../interfaces/IBot"
import ICommand from "../interfaces/ICommand";
import { IDiscordMiddleware } from "../interfaces/IDiscordMiddleware";
import IMiddleware from "../interfaces/IMiddleware";
import { ITwitchMiddleware } from "../interfaces/ITwitchMiddleware";
import BotOptions from "../types/BotOptions";
import { CommandCollection } from "../types/CommandCollection";

export class BotCore implements IBot {
  _isRunning = false;
  _middleware?: ITwitchMiddleware[] | IDiscordMiddleware[];
  _commands: CommandCollection = {};
  _prefix?: string;
  _client: any;
  _options: BotOptions = {};

  constructor(options: BotOptions, commandsDir?: string) {
      this._options = options;
    //TODO: load commands from commandsDir
  }

  run() {
    throw new Error("Must be implemented in subclass.")
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

  protected getCommandFromMessage(messageStr: string):string|null {
    if(!this._options.prefix){
      return messageStr.split(' ')[0];
    }else if(messageStr.startsWith(this._options.prefix)) {
      return messageStr.split(' ')[1];
    }
    else {
      return null;
    }
  }
}