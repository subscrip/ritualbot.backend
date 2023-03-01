const fs = require('fs')
const chalk = require('chalk')
const { Collection } = require('discord.js')

const Logger = require('../container/LoggerContainer')
module.exports = class CommandStructure {
    constructor(client) {
        this.client = client
        this.commands = new Collection()

        this.logger = new Logger({
            scope: this.constructor.name
        })
    }

    async getCommands(folder) {
        var TotalCommands = 0, SlashCommands = []
        const Directory = fs.readdirSync(folder)
        
        for (const Category of Directory) {
            const Commands = fs.readdirSync(`${folder}/${Category}/`).filter(file => file.endsWith('.js'))
            for (const Command of Commands) {
                try {
                    const AppCommand = new (require(`../../.${folder}/${Category}/${Command}`))(this.client)
                    if(AppCommand) {
                        TotalCommands++
                        this.commands.set(AppCommand.data.name, AppCommand)
                        SlashCommands.push(AppCommand.data)
                    }
                } catch(err) {
                    console.log(err)
                }
            }
        }

        this.registrySlashcommands(SlashCommands)
        this.logger.info(`Inicializado ${chalk.yellow.bold(TotalCommands)} comandos..`)
        return;
    }

    async registrySlashcommands(commands) {
        setTimeout(async () => {
            return this.client.application.commands.set(commands)
        }, 3000)
    }
}