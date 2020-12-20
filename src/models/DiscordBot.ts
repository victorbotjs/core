import Discord, { Client, ClientEvents, Message } from "discord.js"
import BotOptions from "../types/BotOptions"
import { IDiscordMiddleware } from "../interfaces/IDiscordMiddleware"
import { BotCore } from './BotCore';
import IDiscordMsgHandler from "../interfaces/IDiscordMsgHandler";
export class DiscordBot extends BotCore implements IDiscordMsgHandler  {
  _middleware?: IDiscordMiddleware[];

  constructor(options: BotOptions,  commandsDir?: string) {
    super(options, commandsDir);
    if(!options.discordBotConfig){
      throw new Error("Must pass Discord Bot configuration options.")
    }
    this.initializeClient()
  }

  initializeClient(){
    this._client = new Discord.Client();
  }

  run() {

    if(!this._options.discordBotConfig){
      throw new Error("This bot should have discord options")
    }

    if(this._isRunning === true) {
      console.warn("Bot is already running...")
      return
    }

    if(this._options.onReady !== undefined) {
      // @ts-ignore TODO: (@bmorrisondev) Figure out how to fix this
      this._client.on("on", this._options.onReady)
    }

    this._client.on("message", this.handleMessage)
    
    const {token} = this._options.discordBotConfig;
    this._client.login(token)
    this._isRunning = true;
  }

  handleMessage(message: Message):void {
    if(message.author.bot && this._options.allowBotToBotInteraction !== true) return;

    if(this._middleware !== undefined) {
      this._middleware.forEach(mw => mw.exec(message))
    }

    const cmd = this.getCommandFromMessage(message.content);
    if(cmd !== null && this._commands[cmd]) {
      this._commands[cmd].exec(message)
    }
  }
}