import { Message } from "discord.js";
import DiscordCommandConfig from "../types/DiscordCommandConfig";

interface ICommand {
  discordCommandConfig?: DiscordCommandConfig;
  commandText: string;
  exec(message: Message): void;
}

export default ICommand