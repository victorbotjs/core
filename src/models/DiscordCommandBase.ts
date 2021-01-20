import { Message } from "discord.js";
import CommandTypeEnum from "../enums/CommandTypeEnum";
import ICommand from "../interfaces/ICommand";
import { Context } from "../main";
import DiscordCommandConfig from "../types/DiscordCommandConfig";

class DiscordCommandBase implements ICommand {
  readonly type = CommandTypeEnum.Discord;
  config: DiscordCommandConfig;

  constructor(config: DiscordCommandConfig) {
    this.config = config
  }

  exec(context: Context): void {
    throw new Error("Method not implemented.");
  }
}

export default DiscordCommandBase