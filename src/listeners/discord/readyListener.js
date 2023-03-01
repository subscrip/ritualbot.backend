const BasedListener =  require('../../loaders/container/base/BaseListener')

const Logger = require('../../loaders/container/LoggerContainer')
module.exports = class Ready extends BasedListener {
    constructor(client) {
        super(client)
        this.client = client
        this.name = 'ready'
        this.emit = 'on'

        this.logger = new Logger({
            scope: this.constructor.name
        })
    }

    async init() {
        this.logger.debug(`${this.client.user.username} Online com sucesso.`)
        
        await this.client.user.setPresence({
            status: 'idle',
        })
    }
}