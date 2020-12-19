import { Message } from "discord.js";

export interface ITwitchMiddleware {
  exec(channel: string, tags: Object, message: string): Function;
}