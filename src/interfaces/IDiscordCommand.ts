import { Message } from "discord.js";

export interface IDiscordCommand {
  commandText: string;
  exec(message: Message): Function;
}