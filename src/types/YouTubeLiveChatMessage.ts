// TODO: This is temporary until I can build the integration with YouTube

class YouTubeLiveChatMessage {
  someYouTubeContent: string = "";

  async reply(replyText: string) {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        resolve(replyText)
      }, 2000)
    })
  }
}

export default YouTubeLiveChatMessage