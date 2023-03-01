const BasedListener =  require('../../loaders/container/base/BaseListener')

module.exports = class Interaction extends BasedListener {
    constructor(client) {
        super(client)
        this.client = client
        this.name = 'interactionCreate'
        this.emit = 'on'
    }

    async init(interaction) {
        this.client.messagesCount += 1
        var int = interaction
        
        if(int.isCommand()) {
            if(!interaction.guild) return;
            const command = this.client.loaders.command.commands.find(cmd => cmd.data.name === int.commandName)
            if(!command) return;

            const DBUser = await this.client.dataServices.getUser(int.user.id)

            try {
                await command.init(int)
            } catch(err) {
                console.log(err)
                return int.reply({ ephemeral: true,
                    content: `ERRO`
                })
            }
        }
    }
}