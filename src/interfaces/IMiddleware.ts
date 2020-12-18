import { Message } from "discord.js";

interface IMiddleware {
  exec(message: Message): void;
}

export default IMiddleware