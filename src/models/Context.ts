import Discord from "discord.js"
import IDatastoreAdapter from "../interfaces/IDatastoreAdapter"

class Context {
  datastores: {[key: string]: IDatastoreAdapter} = {}
  message?: Discord.Message;
}

export default Context