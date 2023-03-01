const ContentLoader = require('../contentLoader')

module.exports = class BasedCommand {
    constructor(client) {
        this.client = client
        
        this.data = {}
        this.ctl = new ContentLoader()
    }

    async init() {}

    async MessageReply(interact=null, Text=null, emoji=null) {
        return interact.reply(`${emoji} › ${Text}`)
    }
}