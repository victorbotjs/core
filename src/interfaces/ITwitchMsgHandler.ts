
export default interface ITwitchMsgHandler{
 handleMessage(channel: string, tags: Object, message: string, self: any): void;
}