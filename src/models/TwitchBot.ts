import tmi from 'tmi.js';

import BotOptions from "../types/BotOptions"
import { ITwitchMiddleware } from "../interfaces/ITwitchMiddleware"
import { BotCore } from './BotCore';
import ITwitchMsgHandler from "../interfaces/ITwitchMsgHandler";
import TwitchBotConfiguration from '../types/TwitchBotConfiguration';
export class TwitchBot extends BotCore implements ITwitchMsgHandler {
  _middleware?: ITwitchMiddleware[];
  constructor( options: BotOptions, commandsDir?: string) {
    super(options, commandsDir);
    if(!options.twitchBotConfig){
      throw new Error("Must pass Twitch Bot configuration options.")
    }
    this.initializeClient(options.twitchBotConfig)
  }

   initializeClient(options: TwitchBotConfiguration){
    const {username, password, channel} = options;

    this._client = new tmi.Client({
        options: { debug: true },
        connection: {
            reconnect: true,
            secure: true,
        },
        identity: {
            username,
            password,
        },
        channels: [channel],
    });
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

  handleMessage(channel: string, tags: Object, message: string, self: any) {
    if(!self) return;

    if(this._middleware !== undefined) {
      this._middleware.forEach(mw => mw.exec(channel, tags, message))
    }

    const cmd = this.getCommandFromMessage(message);
    if(cmd && this._commands[cmd]) {
      this._commands[cmd].exec(channel, tags, message)
    }
  }
}