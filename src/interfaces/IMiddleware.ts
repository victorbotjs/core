import { Message } from "discord.js"
import CommandTypeEnum from "../enums/CommandTypeEnum"

interface IMiddleware {
  exec(message: Message): void;
}

export default IMiddleware