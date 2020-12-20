import Discord, { Client } from "discord.js"
import BotOptions from "../types/BotOptions"
import IMiddleware from "../interfaces/IMiddleware"
import ICommand from "../interfaces/ICommand"
import CommandCollection from "../types/CommandCollection";
import DiscordBotConfiguration from "../types/DiscordBotConfiguration";
import YouTubeBotConfiguration from "../types/YouTubeBotConfiguration";
import Message from "./Message";

class Bot {
  private _isRunning = false;
  private _middleware?: IMiddleware[];
  private _commands: CommandCollection = {};
  private readonly _options: BotOptions = {};

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
      this.runDiscordClient(this._options.discordBotConfig)
      this._isRunning = true;
    }

    if(this._options.youtubeBotConfig !== undefined) {
      this.runYouTubeClient(this._options.youtubeBotConfig)
      this._isRunning = true;
    }
  }

  private execMiddleware(message: Message) {
    if(this._middleware !== undefined) {
      this._middleware.forEach(mw => mw.exec(message))
    }
  }

  private runDiscordClient(options: DiscordBotConfiguration) {
    const client = new Client()
    if(this._options.onReady !== undefined) {
      client.on("on", this._options.onReady)
    }

    client.on("message", async (discordMessage: Discord.Message) => {
      if(discordMessage.author.bot && this._options.allowBotToBotInteraction !== true) return;

      const message = new Message(discordMessage);
      
      this.execMiddleware(message);

      if(message.content.startsWith(options.prefix)) {
        const cmd = message.content.split(' ')[1];
        if(this._commands[cmd]) {
          this._commands[cmd](message)
        }
      }
    })

    client.login(options.token)
  }

  private runYouTubeClient(options: YouTubeBotConfiguration) {
    // TODO: Implement YouTube chat bot
    // TODO: Will need to fetch the live id before the client runs
  }
}

export default Bot