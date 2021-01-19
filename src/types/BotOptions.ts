import Message from "../models/Message"
import DiscordBotConfiguration from "./DiscordBotConfiguration"
import YouTubeBotConfiguration from "./YouTubeBotConfiguration"

type BotOptions = {
  discordBotConfig?: DiscordBotConfiguration;
  youtubeBotConfig?: YouTubeBotConfiguration;
  allowBotToBotInteraction?: boolean;
  onReady?(message: Message): void;
  enableApi?: boolean;
}

export default BotOptions