const fs = require('fs')
const chalk = require('chalk')
const { Collection } = require('discord.js')

const Logger = require('./LoggerContainer')
module.exports = class ListenerStructure {
    constructor(client) {
        this.client = client
        this.events = new Collection()

        this.logger = new Logger({
            scope: this.constructor.name
        })
    }

    async getEvents(folder) {
        var TotalEvents = 0
        const Listeners = fs.readdirSync(folder)
        .filter(file => file.endsWith('.js'))
        
        for (const Event of Listeners) {
            try {
                const Listener = new (require(`../../.${folder}/${Event}`))(this.client)
                if(Listener) {
                    TotalEvents++
                    this.events.set(Listener.name, Listener)
                    this.client.on(Listener.name, (...args) => {
                        Listener.init(...args)
                    })
                }
            } catch(err) {
                console.log(err)
            }
        } 
        
        this.logger.info(`Inicializado ${chalk.yellow.bold(TotalEvents)} eventos..`)
        return;
    }
}