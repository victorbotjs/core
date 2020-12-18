import Discord, { Client, ClientEvents, Message } from "discord.js"
import BotOptions from "../types/BotOptions"
import IMiddleware from "../interfaces/IMiddleware"
import ICommand from "../interfaces/ICommand"
import CommandCollection from "../types/CommandCollection";

class Bot {
  _isRunning = false;
  _middleware?: IMiddleware[];
  _commands: CommandCollection = {};
  _prefix: string;
  _token: string;
  _client: Client;
  _options: BotOptions = {};

  constructor(prefix: string, token: string, options: BotOptions) {
    this._prefix = prefix;
    this._token = token;
    this._client = new Discord.Client();
    if(options) {
      this._options = options;
    }
  }

  use(middleware: IMiddleware) {
    if(this._middleware === undefined) {
      this._middleware = new Array<IMiddleware>()
    }
    this._middleware.push(middleware)
  }

  addCommand(command: ICommand) {
    this._commands[command.commandText] = command.exec
  }

  run() {
    if(this._isRunning === true) {
      console.warn("Bot is already running...")
      return
    }

    if(this._options.onReady !== undefined) {
      this._client.on("on", this._options.onReady)
    }

    this._client.on("message", async (message: Message) => {
      if(message.author.bot && this._options.allowBotToBotInteraction !== true) return;

      if(this._middleware !== undefined) {
        this._middleware.forEach(mw => mw.exec(message))
      }

      if(message.content.startsWith(this._prefix)) {
        const cmd = message.content.split(' ')[1];
        if(this._commands[cmd]) {
          this._commands[cmd](message)
        }
      }
    })

    this._client.login(this._token)
    this._isRunning = true;
  }
}

export default Bot