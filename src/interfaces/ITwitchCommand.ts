export interface ITwitchCommand {
  commandText: string;
  exec(channel: string, tags: object, message: string): Function;
}