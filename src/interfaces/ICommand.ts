import { Message } from "discord.js";

export interface ICommand {
  commandText: string;
  exec(message: Message): Function;
}