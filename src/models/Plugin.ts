import ICommand from "../interfaces/ICommand";
import IMiddleware from "../interfaces/IMiddleware";

class Plugin {
  readonly commands: ICommand[]
  readonly middleware: IMiddleware[]

  constructor(commands: ICommand[] | ICommand, middleware: IMiddleware[] | IMiddleware) {
    if(commands.constructor === Array) {
      this.commands = commands;
    } else {
      this.commands = [commands as ICommand]
    }

    if(middleware.constructor === Array) {
      this.middleware = middleware;
    } else {
      this.middleware = [middleware as IMiddleware]
    }
  }
}

export default Plugin;