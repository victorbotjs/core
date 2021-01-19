import Discord, { Client, Message } from "discord.js"
import BotOptions from "../types/BotOptions"
import IMiddleware from "../interfaces/IMiddleware"
import CommandCollection from "../types/CommandCollection";
import DiscordBotConfiguration from "../types/DiscordBotConfiguration";
import YouTubeBotConfiguration from "../types/YouTubeBotConfiguration";
import IDatastore from "../interfaces/IDatastoreAdapter";
import DiscordCommandBase from "./DiscordCommandBase";
import MiddlewareBase from "./MiddlewareBase";
import Context from "./Context";
import IDatastoreAdapter from "../interfaces/IDatastoreAdapter";
// import Message from "./Message";

class Bot {
  private _isRunning = false;
  private _middleware?: MiddlewareBase[];
  private _commands: CommandCollection = {};
  private readonly _options: BotOptions = {};
  private _datastoreAdapters?: IDatastoreAdapter[];

  constructor(options: BotOptions) {
    this._options = options;
  }

  use(usable: Plugin | DiscordCommandBase | MiddlewareBase) {
    if(typeof(usable) === typeof(Plugin)) {
      // TODO: Implement
    }

    if(usable instanceof DiscordCommandBase) {
      const command = usable as DiscordCommandBase
      this._commands[command.config.commandText] = command.exec
    }

    if(usable instanceof MiddlewareBase) {
      if(this._middleware === undefined) {
        this._middleware = []
      }
      this._middleware.push(usable as MiddlewareBase)
    }
  }

  addDatastore(datastore: IDatastore) {
    if(this._datastoreAdapters === undefined) {
      this._datastoreAdapters 
    }
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

    // if(this._options.youtubeBotConfig !== undefined) {
    //   this.runYouTubeClient(this._options.youtubeBotConfig)
    //   this._isRunning = true;
    // }
  }

  private execMiddleware(context: Context) {
    if(this._middleware !== undefined) {
      this._middleware.forEach(mw => mw._exec(context))
    }
  }

  private buildContext(message: Discord.Message): Context {
    const context = new Context();
    if(this._datastoreAdapters !== undefined) {
      this._datastoreAdapters.forEach(dsa => {
        context.datastores[dsa.identifier] = dsa;
      })
    }
    return context;
  }

  private runDiscordClient(options: DiscordBotConfiguration) {
    const client = new Client()
    if(this._options.onReady !== undefined) {
      // @ts-ignore TODO: Figure out why TS hates this
      client.on("ready", this._options.onReady)
    }

    client.on("message", async (message: Discord.Message) => {
      if(message.author.bot && this._options.allowBotToBotInteraction !== true) return;

      const context = this.buildContext(message)
      
      this.execMiddleware(context);

      if(message.content.startsWith(options.prefix)) {
        const cmd = message.content.split(' ')[1];
        if(this._commands[cmd]) {
          this._commands[cmd](message)
        }
      }
    })

    client.login(options.token)
  }
}

export default Bot