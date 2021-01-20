import Discord from "discord.js"
import IDatastoreAdapter from "../interfaces/IDatastoreAdapter"

class Context {
  datastore?: IDatastoreAdapter;
  message?: Discord.Message;
}

export default Context