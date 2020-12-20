export interface ITwitchMiddleware {
  exec(channel: string, tags: Object, message: string): Function;
}