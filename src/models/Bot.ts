import Discord, { Client, Message } from "discord.js"
import BotOptions from "../types/BotOptions"
import IMiddleware from "../interfaces/IMiddleware"
import CommandCollection from "../types/CommandCollection";
import DiscordBotConfiguration from "../types/DiscordBotConfiguration";
import YouTubeBotConfiguration from "../types/YouTubeBotConfiguration";
import DiscordCommandBase from "./DiscordCommandBase";
import MiddlewareBase from "./MiddlewareBase";
import Context from "./Context";
import IDatastoreAdapter from "../interfaces/IDatastoreAdapter";
import PluginBase from "./PluginBase"
// import Message from "./Message";

class Bot {
  private _isRunning = false;
  private _middleware?: MiddlewareBase[];
  private _commands: CommandCollection = {};
  private readonly _options: BotOptions = {};
  private _datastoreAdapter?: IDatastoreAdapter;

  constructor(options: BotOptions) {
    this._options = options;
  }

  private log(...args: any) {
    if(this._options.debugMode) {
      console.log(...args)
    }
  }

  use(usable: PluginBase | DiscordCommandBase | MiddlewareBase) {
    if(usable instanceof PluginBase) {
      this.registerPlugin(usable as PluginBase)
    }

    if(usable instanceof DiscordCommandBase) {
      this.registerCommand(usable as DiscordCommandBase)
    }

    if(usable instanceof MiddlewareBase) {
      this.registerMiddleware(usable as MiddlewareBase)
    }
  }

  private registerPlugin(plugin: PluginBase) {
    this.log('Registering plugin: ', plugin)
    if(plugin.commands !== undefined) {
      this.log('Registering plugin commands: ', plugin.commands)
      if(plugin.commands instanceof Array) {
        this.log('Array of commands')
        plugin.commands.forEach((cmd: DiscordCommandBase) => this.registerCommand(cmd))
      } else {
        this.log('Single command')
        this.registerCommand(plugin.commands as DiscordCommandBase)
      }
    }

    if(plugin.middleware !== undefined) {
      this.log('Registering plugin middleware: ', plugin.middleware)
      if(plugin.middleware instanceof Array) {
        this.log('Array of middleware')
        plugin.middleware.forEach((mw: MiddlewareBase) => this.registerMiddleware(mw))
      } else {
        this.log('Single middleware')
        this.registerMiddleware(plugin.middleware as MiddlewareBase)
      }
    }
  }

  private registerMiddleware(middleware: MiddlewareBase) {
    this.log('Registering middleware: ', middleware)
    if(this._middleware === undefined) {
      this._middleware = []
    }
    this._middleware.push(middleware)
  }

  private registerCommand(command: DiscordCommandBase) {
    this.log('Registering command: ', command)
    this._commands[command.config.commandText] = command.exec
  }

  async addDatastore(datastorAdapter: IDatastoreAdapter) {
    this._datastoreAdapter = datastorAdapter
    if(this._datastoreAdapter.init !== undefined) {
      await this._datastoreAdapter.init();
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
    if(this._datastoreAdapter !== null) {
      context.datastore = this._datastoreAdapter;
    }
    context.message = message;
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
          this._commands[cmd](context)
        }
      }
    })

    client.login(options.token)
  }
}

export default Bot