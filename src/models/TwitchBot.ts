import tmi from 'tmi.js';

import { BotOptions } from "../types/BotOptions"
import { ITwitchMiddleware } from "../interfaces/ITwitchMiddleware"
import { ITwitchCommand } from "../interfaces/ITwitchCommand"
import { CommandCollection } from "../types/CommandCollection";
import { BotCore } from './BotCore';

export class TwitchBot extends BotCore {
  _middleware?: ITwitchMiddleware[];

  constructor(prefix: string, options: BotOptions, username: string, password: string,channel: string, commandsDir?: string) {
    super(prefix, options, commandsDir);
    this.initializeClient(username, password, channel)
  }

  initializeClient(username:string, password:string, channel:string){
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

  handleMessage(channel: string, tags: Object, message: string, self: any) {
      if(this._middleware !== undefined) {
        this._middleware.forEach(mw => mw.exec(channel, tags, message))
      }
  }
}