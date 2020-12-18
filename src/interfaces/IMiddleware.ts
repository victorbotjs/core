import { Message } from "discord.js";

export interface IMiddleware {
  exec(message: Message): Function;
}