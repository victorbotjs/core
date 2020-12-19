import { Message } from "discord.js"
import DiscordBotConfiguration from "./DiscordBotConfiguration"
import YouTubeBotConfiguration from "./YouTubeBotConfiguration"

type BotOptions = {
  discordBotConfig?: DiscordBotConfiguration;
  youtubeBotConfig?: YouTubeBotConfiguration;
  allowBotToBotInteraction?: boolean;
  onReady?(message: Message): void;
}

export default BotOptions