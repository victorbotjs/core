import Discord from "discord.js";
import YouTubeLiveChatMessage from "../types/YouTubeLiveChatMessage";

class Message {
  private _discordMessage?: Discord.Message;
  private _youtubeMessage?: YouTubeLiveChatMessage
  content: string = "";

  constructor(message: Discord.Message | YouTubeLiveChatMessage) {
    if(message instanceof Discord.Message) {
      this._discordMessage = message
      this.content = this._discordMessage.content;
    }

    if(message instanceof YouTubeLiveChatMessage) {
      this._youtubeMessage = message;
      this.content = this._youtubeMessage.someYouTubeContent;
    }
  }

  async reply(replyText: string) {
    if(this._discordMessage !== undefined) {
      await this._discordMessage.reply(replyText);
    }
    
    if(this._youtubeMessage !== undefined) {
      await this._youtubeMessage.reply(replyText);
    }
  }
}

export default Message
