import { Message } from 'discord.js'
import CommandTypeEnum from '../enums/CommandTypeEnum';
import DiscordCommandConfig from "../types/DiscordCommandConfig";

interface ICommand {
  type: CommandTypeEnum;
  config?: DiscordCommandConfig;
  exec(message: Message): void;
}

export default ICommand