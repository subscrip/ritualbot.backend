const BasedListener =  require('../../loaders/container/base/BaseListener');
const UserDatabase = require('../../models/UserDatabase');
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const Markov = require('markov-strings').default
const date = new Date();
let messageCount = 0
const channelId = '744270388963311809'

const fs = require('fs');
const { addXP, leaderboard } = require('simply-xp');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = class MessageCreate extends BasedListener {
    constructor(client) {
        super(client)
        this.client = client
        this.name = 'messageCreate'
        this.emit = 'on'
    }

    async init(message) {
        if(message.author.bot) return;
        this.client.messagesCount += 1
        if(message.content.match(GetMention(this.client.user.id))) {
            return message.reply(`${message.author} escreva / no chat para ver meus comandos <:optimusLIKE:1056712260216700968>`)
        }

        
        addXP(message, message.author.id, message.guild.id, {
            min: 1,
            max: 2,
        })

        if(message.channel.id == channelId) {
            const states = fs.readFileSync('./frases.txt', { encoding: 'utf-8' }).split('\n')
        if (states.length === 5000) {
            states.shift()
        }

        if(message.content !== '') {
            states.push(message.content)
            fs.writeFileSync('./frases.txt', states.join('\n'))
        }
        const markov = new Markov({ stateSize: 1 })

        markov.addData(states)
        const options = {
            maxTries: 20,
            prng: Math.random,
        }
            messageCount++;
            if(messageCount % 20 == 0) {
                const result = markov.generate(options)
                message.channel.send(result.string)
            }
        }

        if(message.content === "optimus") {
            return message.reply(
                `
                MEU NOME É OPTIMUS PRIME E DEIXO ESSA MENSAGEM PARA TODOS OS AUTOBOTS\nNesse frio as mina tão tudo com os peitinho durin kkk mandar foto = humilde
                `
            )
        }

        if(message.content === "enviarmsgavisos") {
            const channel = this.client.channels.cache.get("744270016639139911")
            let embed = new EmbedBuilder()
            .setDescription(`
            **MEU NOME É OPTIMUS PRIME E DEIXO ESSA MENSAGEM PARA TODOS OS AUTOBOTS**

            :robot: Meus criadores <@1053131637187149905> e <@751524503351459961> me concederam as habilidades necessárias para proteger, ajudar e entreter o ritual neste servidor de discord

            **PARA A ADMINISTRAÇÃO**
            ● Avisos de eventos
            ⤷ /666 arma (avisos prontos para eventos do armamc.com)
            ⤷ /666 revo (avisos prontos para eventos do rederevo.com)
            ● Moderação Inovadora
            ⤷ /666 warn (sequência de avisos com punições automáticas)
            ● Perfil e registros
            ⤷ /666 register [@user#0000] [NameMC]
            ⤷ /666 profile (mostra todas as informações do usuário)

            **PARA TODOS OS MEMBROS**
            ● Comandos 4fun
            ⤷ /666 random (todo o conteúdo de #filosofia #🦪│pérolas #📝│copypastas)
            ⤷ respostas automáticas para palavras chaves
            ● Nível de procrastinação
            ⤷ /666 rank (mostra sua posição, level e xp totais no server)
            ● Comunicação da IA 
            ⤷ Replicando os ensinamentos do <@569277281046888488> no <#744270388963311809>

            Sejam educados comigo, ainda estou aprendendo algumas coisas, mas com o tempo pegarei o jeito

            <:optimusLIKE:1056712260216700968> Até lá se tiver alguma sugestão fale com meus criadores
            `)
            channel.send({ embeds: [embed], content: `@everyone` })
        }
    }
}