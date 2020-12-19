export default {
  // Models
  Bot: import("./models/Bot"),

  // Interfaces
  ICommand: import("./interfaces/IDiscordCommand"),
  IMiddleware: import("./interfaces/IDiscordMiddleware"),
  
  // Types
  BotOptions: import("./types/BotOptions")
}