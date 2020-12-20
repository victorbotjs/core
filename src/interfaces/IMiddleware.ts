import Message from "../models/Message";

interface IMiddleware {
  exec(message: Message): void;
}

export default IMiddleware