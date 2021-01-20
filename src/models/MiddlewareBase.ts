import Context from "./Context";
import UsableTypeEnum from '../enums/UsableTypeEnum'

class MiddlewareBase {
  readonly type = UsableTypeEnum.Middleware;
  exec?(context: Context): void;

  async _exec(context: Context) {
    if(this.exec !== undefined) {
      await this.exec(context)
    } else {
      console.warn("Middleware configured without 'exec' definition...")
    }
  }
}

export default MiddlewareBase;