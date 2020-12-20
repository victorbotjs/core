import { Message } from "discord.js"
import DiscordBotConfiguration from "./DiscordBotConfiguration"
import YouTubeBotConfiguration from "./YouTubeBotConfiguration"
import TwitchBotConfiguration from "./TwitchBotConfiguration"

type BotOptions = {
  discordBotConfig?: DiscordBotConfiguration;
  youtubeBotConfig?: YouTubeBotConfiguration;
  twitchBotConfig?: TwitchBotConfiguration
  allowBotToBotInteraction?: boolean;
  prefix? : string;
  onReady?(message: Message): void;
}

export default BotOptions