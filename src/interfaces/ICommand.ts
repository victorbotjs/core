import { Message } from "discord.js";

interface ICommand {
  commandText: string;
  exec(message: Message): void;
}

export default ICommand