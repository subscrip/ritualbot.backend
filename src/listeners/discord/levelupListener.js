const BasedListener =  require('../../loaders/container/base/BaseListener')

module.exports = class Ready extends BasedListener {
    constructor(client) {
        super(client)
        this.client = client
        this.name = 'levelUp'
        this.emit = 'on'
    }

    async init(message, data) {
        message.reply(
            `${message.author} VOCÊ ACABA DE CHEGAR AO NÍVEL ${data.level} <:morti:1042986181169786890> 

            https://www.youtube.com/watch?v=EQmIBHObtCs`
        )
    }
}