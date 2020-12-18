import Discord, { Client, ClientEvents, Message } from "discord.js"
import BotOptions from "../types/BotOptions"
import IMiddleware from "../interfaces/IMiddleware"
import ICommand from "../interfaces/ICommand"
import CommandCollection from "../types/CommandCollection";

class Bot {
  _isRunning = false;
  _middleware?: IMiddleware[];
  _commands: CommandCollection = {};
  _discordClient?: Client;
  _options: BotOptions = {};

  constructor(options: BotOptions) {
    this._options = options;
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

    if(this._options.discordBotConfig !== undefined) {
      let { prefix, token } = this._options.discordBotConfig;
      this.runDiscordClient(prefix, token)
      this._isRunning = true;
    }

  }

  private runDiscordClient(prefix: string, token: string) {
    const client = new Client()
    if(this._options.onReady !== undefined) {
      client.on("on", this._options.onReady)
    }

    client.on("message", async (message: Message) => {
      if(message.author.bot && this._options.allowBotToBotInteraction !== true) return;

      if(this._middleware !== undefined) {
        this._middleware.forEach(mw => mw.exec(message))
      }

      if(message.content.startsWith(prefix)) {
        const cmd = message.content.split(' ')[1];
        if(this._commands[cmd]) {
          this._commands[cmd](message)
        }
      }
    })

    client.login(token)
  }
}

export default Bot