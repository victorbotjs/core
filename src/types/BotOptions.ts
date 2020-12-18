import { Message } from "discord.js"

type BotOptions = {
  allowBotToBotInteraction?: boolean;
  onReady?(message: Message): void;
}

export default BotOptions