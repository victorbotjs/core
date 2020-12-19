
export interface ITwitchCommand {
  commandText: string;
  exec(channel: string, tags: Object, message: string): Function;
}