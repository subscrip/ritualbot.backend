require('dotenv').config()
const CommandStructure = require('../loaders/command/CommandStructure')
const ListenerStructure = require('../loaders/container/ListenerContainer')
const DatabaseManager = require('../loaders/container/DatabaseContainer') 
const {Client} = require('discord.js')

const DatabaseServices = require('../utils/DatabaseServices')
const settings = require('../../settings')
const { connect } = require('simply-xp')
module.exports = class App extends Client {
    constructor(...options) {
        super(...options)
        
        this.started = Date.now()
        this.messagesCount = 0
        this.dataServices = new DatabaseServices(this)
        this.database = new DatabaseManager().loadSchemas()
        this.loaders = {
            command: new CommandStructure(this),
            listener: new ListenerStructure(this),
        }
    }

    async start(options={ sourceCommands, sourceListeners }) {
        this.loaders.command.getCommands(options?.sourceCommands)
        this.loaders.listener.getEvents(options?.sourceListeners)
        this.login(settings.token)

        connect(process.env.MONGOOSE, {
            notify: true
        })
        return;
    }
}