import { BotOptions } from "../types/BotOptions"
import { ITwitchMiddleware } from "./ITwitchMiddleware";
import { IDiscordMiddleware } from "./IDiscordMiddleware";

export default interface IBot {
    use: Function,
    run: Function,
    _isRunning: boolean,
    _middleware?: ITwitchMiddleware[] | IDiscordMiddleware[],
    _prefix: string,
    _client:any,
    _options: BotOptions,
    handleMessage: Function
}
