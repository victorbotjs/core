
export default interface ICommand {
  commandText: string;
  exec: Function;
  userCooldown? : number;
  globalCooldown? : number;
}