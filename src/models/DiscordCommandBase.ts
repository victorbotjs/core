import { Message } from "discord.js";
import CommandTypeEnum from "../enums/CommandTypeEnum";
import ICommand from "../interfaces/ICommand";
import DiscordCommandConfig from "../types/DiscordCommandConfig";

class DiscordCommandBase implements ICommand {
  readonly type = CommandTypeEnum.Discord;
  config: DiscordCommandConfig;

  constructor(config: DiscordCommandConfig) {
    this.config = config
  }

  exec(message: Message): void {
    throw new Error("Method not implemented.");
  }
}

export default DiscordCommandBase