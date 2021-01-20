import CommandTypeEnum from '../enums/CommandTypeEnum';
import { Context } from '../main';
import DiscordCommandConfig from "../types/DiscordCommandConfig";

interface ICommand {
  type: CommandTypeEnum;
  config?: DiscordCommandConfig;
  exec(context: Context): void;
}

export default ICommand