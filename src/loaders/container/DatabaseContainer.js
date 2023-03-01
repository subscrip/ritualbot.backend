const {Collection} = require('discord.js')
const {Schema, connect} = require('mongoose')

const settings = require('../../../settings')
const Logger = require('./LoggerContainer')
module.exports = class DatabaseManager {
    constructor(client) {
        this.client = client
        this.logger = new Logger({
            scope: this.constructor.name
        })

        var options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        connect(settings.database, options, (err) => {
            if(err) return this.logger.error(`Database Connect Error`, err)
            this.logger.info(`Database Connected successfully..`)
        })
    }

    loadSchemas() {
        return {
            User: require('../../models/UserDatabase'),
            Warns: require('../../models/WarnDatabase')
        }
    }
}