import { DiscordCommandBase, MiddlewareBase } from "../main";

class PluginBase {
  public commands?: DiscordCommandBase[] | DiscordCommandBase;
  public middleware?: MiddlewareBase[] | MiddlewareBase;
}

export default PluginBase;