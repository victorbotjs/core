import { Message } from "discord.js";

export interface IDiscordMiddleware{
  exec(message: Message): Function;
}