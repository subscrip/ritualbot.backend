const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ComponentType } = require('discord.js');
const ms = require('ms');
const xp = require('simply-xp');
const BasedCommand = require('../../loaders/command/BaseCommand');
const ContentLoader = require('../../loaders/contentLoader');
const NameMcDatabase = require('../../models/NameMcDatabase');
const UserDatabase = require('../../models/UserDatabase');
const WarnDatabase = require('../../models/WarnDatabase');

require('dotenv').config()
module.exports = class StatusCommand extends BasedCommand {
    constructor(client) {
        super(client)
        this.client = client
        
        this.data = {
            name: '666',
            description: "📊 › Comando principal.",
            options: [
                { name: 'arma', description: '📊 › Anuncie eventos do servidor.', type: 1, options: [
                    { name: 'evento', description: 'Selecione o evento', type: 3, required: true, choices: [
                        { name: 'War', value: 'war' },
                        { name: 'PreWar', value: 'prewar' },
                        { name: 'CxC', value: 'cxc' },
                        { name: 'Gladiador', value: 'glad' },
                        { name: 'Arqueiro', value: 'arqueiro' },
                        { name: 'Killer', value: 'killer' }
                    ] }
                ] },
                { name: 'revo', description: '📊 › Anuncie eventos do servidor.', type: 1, options: [
                    { name: 'evento', description: 'Selecione o evento', type: 3, required: true, choices: [
                        { name: 'SuperWar', value: 'superwar' },
                        { name: 'War', value: 'guerra' },
                        { name: 'PreWarON', value: 'prewaron' },
                        { name: 'PreWarOFF', value: 'prewaroff' },
                        { name: 'CxC', value: 'cxc' },
                        { name: 'Guerreiro', value: 'guerreiro' },
                        { name: 'Gladiador', value: 'gladiador' },
                        { name: 'Besteiro', value: 'besteiro' },
                        { name: 'Arqueiro', value: 'arqueiro' },
                        { name: 'Killer', value: 'killer' },
                        { name: 'Lanceiro', value: 'lanceiro' },
                        { name: 'Dominador', value: 'dominador' },
                    ] }
                ] },
                { name: 'warn', description: '🚫 › Punições.', type: 2, options: [
                    { name: 'add', description: '🚫 › Warn.', type: 1, options: [
                        { name: 'user', description: 'Avise um usuário', type: 6, required: true },
                        { name: 'motivo', description: 'Descreva um motivo', type: 3, required: false },
                        { name: 'provas', description: 'Coloque uma imagem', type: 11, required: false }
                    ] },
                    { name: 'clear', description: '🚫 › Apagar TUDO.', type: 1, options: [
                        { name: 'user', description: 'Apague todos os avisos do usuário', type: 6, required: true }
                    ] },
                    { name: 'remove', description: '🚫 › Remova um aviso', type: 1, options: [
                        { name: 'user', description: 'Remova um aviso', type: 6, required: true },
                        { name: 'id', description: 'Descreva o ID do aviso', type: 4, required: true }
                    ] }
                ] },
                { name: 'ban', description: '🚫 › Punições.', type: 1, options: [
                    { name: 'user', description: 'Usuário', type: 6, required: true },
                    { name: 'motivo', description: 'Motivo', type: 3 },
                ] },
                { name: 'random', description: '📊 › Diversão', type: 1 },
                { name: 'profile', description: '📊 › Perfil.', type: 1, options: [
                    { name: 'user', description: '📊 › Usuário', type: 6, required: true },
                ] },
                { name: 'register', description: 'Administração', type: 1, options: [
                    { name: 'usuário', description: 'mencione o usuário', type: 6, required: true },
                    { name: 'nick', description: 'Nickname do mc', type: 3, required: true }
                ] },
                { name: 'rank', description: 'Rank De XP', type: 1, options: [{ name: 'user', description: 'Usuário', type: 6, required: true }] }
            ]
        }
    }

    async init(int) {
        const { options, guildId, user, member } = int;

        if(options.getSubcommand() == "rank") {
            let userT = int.options.getUser("user")
            let fetchedXp = xp.fetch(userT.id, guildId)

            fetchedXp.then(async(e) => {
                int.reply(
                    `
                    **RANK:** ${e.rank}\n**LEVEL:** ${e.level}\n**XP:** ${e.xp}/${e.reqxp}
                    https://cdn.discordapp.com/attachments/1065534924813242408/1080172815942160444/e32c72d224a5a127474e35ca9ec3c1f4.png
                    `
                )
            })
        }
        if(options.getSubcommand() == "register") {
            if(!int.member.permissions.has(PermissionFlagsBits.KickMembers)) return int.reply({ content: `:x:`, ephemeral: true })
            let userTarg = int.options.getUser("usuário");
            let nickNamea = int.options.getString("nick")
            const member = int.guild.members.cache.get(userTarg.id);

            NameMcDatabase.findOne({ user: userTarg.id }, async(err, data) => {
                if(err) throw err;

                if(!data) {
                    data = new NameMcDatabase({
                        user: userTarg.id,
                        nicks: [
                            {
                                nick: nickNamea
                            }
                        ]
                    })
                } else {
                    const NameContent = {
                        nick: nickNamea
                    }
                    data.nicks.push(NameContent)
                }
                data.save();

                member.setNickname("╵666╷ " + nickNamea).then(() => {
                    return int.reply({ content: `<:optimusLIKE:1056712260216700968>` })
                })
            })
        }

        if(options.getSubcommand() == "random") {
            let msg = [
                "senta na pica e come o bolo ou senta no bolo e chupa a pica?",
                "https://cdn.discordapp.com/attachments/1045429174015365200/1077081292115562618/image.png",
                "Com arco  e infinidade poderá tirar quantas flecha que nós quer",
                "Amar é o suicídio mais belo que existe.",
                "a vida n é 20 flores nem 10 é só 1 e qnd vc perde se uchero ngm mais vai faze seu chero por vc moro",
                "rosas são vermelhas, violetas são azuis, nefesto, quando nós dara seu cu?",
                "a vida é como se fosse um mel e nos somos as abelhas e voce nao pode deixa o mel fica velho se nao o mel estraga e voce tambem nao pode vender o mel por que é uma metafora ta ligado",
                "me jogaram aos lobos e voltarei morto ne poha kkkkkkkj",
                "fui peidar e quase acabei me cagando",
                "fui da um peidinho acabei me cagando todo borrei todo o shorts",
                "nunca julgue um livro todo nunca jogue um livro todo por um papel de pagina",
                "A minha vida é tipo uma casa assombrada, só que o fantasma sou eu.",
                "Do que adianta fazer 22 cps pra na hora da war tomar ban por múltiplas regras quebradas -randoomm 1/12/22",
                "quando eu era criança eu controlava soldados de brinquedo,hoje eu controlo uma naçao em um jogo quadrado -Mth0309 2022",
                "deve ser muito bom ser um amigo ser um amigo de cara de ser banido de um servidor ser bom de ser amigo de adm ser amigo de um adm de servidor",
                "Aos q falam de mim pelas costas, Obrigado. É sinal que estamos sempre na frente",
                "eles tocam a minha campainha e saiem correndo, ja eu arrombo a porta e do um tiro de escopeta no dono da propriedade ",
                "O homem forte defende a si mesmo, o homem mais forte defende aos outros",
                "o homem medroso sente medo o homem mais medroso se borra de medo",
                "um homem forte se protege sozinho, já o homem mais forte protege o neymar jr",
                "''um neymar liso cai,um neymar lagado voa''",
                "nunca julgue um livro todo nunca jogue um livro todo nunca jogue um livro todo por um papel de pagina",
                "Em momento de combate, o cu do nefesto vai pro ataque",
                "Em momento de perigo, o cu do nefesto vira abrigo",
                "em piscina de piroka o Nef nada de costas",
                "é melhor um buraco na sua camisinha do que uma camisinha no seu buraco",
                "respire, pois se você não respirar, você morre sem ar",
                "em terra de poço fundo, o cu do Toddyz1k é o mais profundo",
                "no servidor da 666 o pet e justamente o unico cara que frequenta a igreja",
                "Se você parar pra pensar, você vai pensar parado.",
                "se no brasil vende havaianas, no havai vende brasileiros?",
                "Eu sou Optimus Prime e deixo esta mensagem para que nossas histórias sejam lembradas. Pois nestas memórias seremos eternos.",
                "Se você correr atrás de uma abelha, ela correrá de você. Se você tem um jardim bonito, as abelhas que correram atrás de você. e se não correrem, você ainda terá um jardim bonito",
                "MEU NOME É OPTIMUS PRIME E DEIXO ESSA MENSAGEM PARA TODOS OS AUTOBOTS\nNesse frio as mina tão tudo com os peitinho durin kkk mandar foto = humilde",
                "gente e se o everson zoio for tipo deus, por isso que ele faz um monte de desafio e nao morre, foi um desafio dele o bigbang ai deu errado ai a gnt nasceu",
                "Já engoli muita porra calado, já tomei muito no cu, já me fudi várias vezes, já aguentei cada caralho na vida, muita bolada nas costas, muita paulada por trás, já me machucaram muito por dentro, já meteram muito o pau em mim quando virei as costas, mas hoje continuo forte. É isso, o certo é esperar a hora certa para dar o troco, porque não tem nada melhor que dar na hora certa.",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077378912507674744/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077378912763531374/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077378912998400070/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077378731355676713/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077378654138548254/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077378526321311787/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077378457471811594/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077377155098497145/Screenshot_1995.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077367586196562080/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077089173124694087/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077076865224822914/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077076567613775892/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077075554135707768/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077058142728364062/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077052248141607032/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077049086852743168/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077049087058251826/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077049087272177774/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077049087507054652/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1077039015896821900/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076967596785672262/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076951006019059752/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076941989301465159/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076940628979626145/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076927590159351818/IMG-20230219-WA0003.jpg",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076662335172788314/Screenshot_34.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076645629712924834/2023-02-18_06.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076645502357098566/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076624140200587275/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076534794139222169/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1076312903621300296/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1075959404102434906/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1075838398989881444/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1075838510419939449/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1075838581593092107/image.png",
                "https://cdn.discordapp.com/attachments/1072989061083566120/1075590881853321236/image.png",
                "Olá @╵666╷Legsz 🦵 este é um grupo do jogo Undercards 🪪\nNesse grupo 🧑‍🤝‍🧑 todos os finais de semana 📅 teremos torneios 🏆 e nesses torneios 🤓 dependendo da sua posição 🧘 você ganhará alguns pontos 🖊️ No final 📉 quando nos pararmos com os torneios ⏱️ o PRIMEIRO colocado 🥇  ganhará contributor 🤑 no jogo Undercards 🤣",
                "owww manooow 🙋‍♂️ vocês não acreditam manooow 🙀  acabei de descobrir a fake do Landzking 😼, é o PanzerSoldat 🤭, sou muito rato manowww 🐀 🙅‍♂️\n😱😱Ow Ow.. ✋ Vamo esquecer essa porra ai..😖😖 Foi uma guerra de bosta!!💩💩💩 Mas Ow Ow Ow.. 😳😳 Jonas, Morgan 👧👧 F-F-F-Fala com o o o Thiago 👨‍🦲👩‍🦲 Ai velho 👴👴 Não tem condição 🛑🛑 de ir PVP ⚔️⚔️ Não cara!! 😢😢😢 Os cara tão mto xitado!! 👨‍💻👨‍💻👨‍💻 pelo amor de deus!! 🙏🙏🙏 Telso 🥶, Ragnar🐯 lá.. ta louco?? 🤯🤯 O Mocha.. 🦊🦊 é LIXOO 💩💩 Q-Queria pegar aql zoi gelado e esbugaiar!! 👀👀👀",
                "Macaco nosso que estais na Índia, santificado seja a vossa banana, assim no Peru como na Índia, a banana nossa que nos dai hoje, perdoai  nossas macaquices, assim como nós perdoamos a quem nos macacou, e nao deixeis cair de boca na banana, mas livrai-nos do ban, amém",
                "Idai 😮‍💨 🤨 que eu não dou capa 😢 🥺 idai que eu não tenho 😶‍🌫️ 🤯 roupa pra jogar 🦺 🎮  idai que eu não tenho aqueles 💯 😙 emote pra fazer 😸 👉 👌 trend do tiktok 😅 😆 só tem uma coisa que vc 🤕 🤒 não tem! HUMILDADE 😠 😤 😥 sério gente 😕 😖 o que ta acontecendo com o free fire? 😜😼 só da peito 👱‍♀️ 🫁 é bot 🤖 🤖 não tem roupa 😫 🦺 é ruim a pessoa pode 🍴 🐷 ser melhor que você sem roupa 👯 👜 aliás roupa não define jogabilidade 💣😜😼",
                "anúncio 📣 importante ⚠️☢️😪 eu nefesto striker debandareis o clã. iremos todos para a sun ☀️ que é melhor clã com meu amigo @cryingpep ele é muito gente boa e fuma maconha com o teddyb4ear todos os dias por isso Acho o mesmo daora. o teddybear será nosso guia espiritual e umbandista já que o mesmo será líder da sol e da sun. logo depois disso alguns peleco da sol quitaram e criaram o clã 666 para bate de frente com o clã louco do teddybmais teddyb4ear resistiu pq ele é omanis louco do server e dominou tudo",
                "Olha gente :oo:  fiquei tão feliz 😁 com meus ultimos dias na TBF 🥹 mais eu não é nada pessoal mais nã me senti ultilidades 🛠️ aqui na TBF  ⛏️ mais um dia a pessoa tem que partir 🤱 🐥 vou sentir falta de todos esperem que não🥹  fiquem com raiva 😡 ou odio🗯️  de min 🥲 ok foi minha escolha não sou um otimo farmer🤨  ok sou melhor em pvp🤺tipo essa semana mau 🤧 farmei ent digo adeus👨‍⚖️  espero ainda sejam meus 🤙 amigos👰‍♀️   e amigas adeus💃",
                "El lobo 🐺 siempre 🛡️ cuida su loba 🐺 … 🌕 AAAUUUUU baby, I’m preying 🤤 on you tonight 🌃 hunt you down 🐺 eat you alive 🫃 JUST LIKE ANIMALS",
                "Boa tarde, 😕 servidor. 😿 😔  Venho aqui em nome da 300 😎 🧘 anunciar o fim oficial do clã. 🥹 🏆 ❌ Foram muitos nomes, 👱‍♀️ anos ❓❓ de luta e dedicação, ⚓ 🐒  diversas pessoas envolvidas, 🤹‍♂️ 🎭  mártires na nossa cruzada. ✝️ 🫵  Infelizmente nosso clã 💩 🗑️ teve que encarar o destino 🚧 💭  de todas as coisas nesta criação. 🥺 🦌  Deixamos um memorial em honra 💋 👽 à nossa história na /go R1P. 😂 😢  Agradecemos à todos aqueles 👦  que participaram 🤝 🫅 dessa jornada e desejo em nome da 💣 🇮🇱  coalizão Odyssey que o Senhor 👳 ☪️  abençoe esse servidor e 🏳️‍🌈 🤓 todos nele presentes. 😓🌹",
                "logico 😳  mano servidor 🕵️😇 é pura bomba 🫣, não sei como vcs joga 😡  nesse sv horrivel 🗣️ .",
                "Aquele  dia  📆que vc me  roubou🕵️ um arco🏹 ????❓ engano seu  bebê👶, abri  sim👍 ,e  realmente odeio😡  o gembrim no  bom sentido😇 , pois  ele não  responde  privado🫣❌,  pelo  menos  os meus ele nunca respondeu😢, ele só responde se tiver ticket🎫 aberto, presta atenção⚠️ criatura no que vc fala🗣️ .",
                "AMO 😍💘 O  REDEREVO ☢️⚠️ e   o Nevisk 🐻 e  o Gembrim  ⚧  sabem  disso 🕰️ mas  quando  precisar  reclamo 📣 sim 👌  e  respeito 🦾  todos  os  outros  que  o fazem 🤓",
                "Clara 🤍 vc me mandou msg ✉️ no zap ⚡ e me deu block 🚫 não entendi nd com nd ⚠️ que vc disse 😬 vc poderia 😊 me desbloquear pra gente 🫂 conversar 😍 🥰",
                "é isso, ele ajoelhou pra me pedir em namoro 🐂 😻 na chuva🌂🌧️ e na frente de outras pessoas, ☂️ 👩‍👩‍👧‍👧 eu te amo mtmtmt ❤️😻 e você tem me feito feliz a muito tempo 🧐, quando você disse que viria aqui eu não levei a sério 😈 😻  e olha só kkkkkkk eu te amo meu bem, não tem palavras 😭 😜 que descrevam o quanto eu tô feliz 🤙😝  por ter você na minha vida 😻 🤍.",
                "olha🧐  isso minha👩‍🍼  pipoketi 🍿 gente olha🧐  aqui a sobrancelha😒  rosa 🌹 aprendam catileias🤨  voce 👉 nunca vai ser uma😡 🤬  pipoketi🍿",
                "ain😜me sigam👈no instragam🤪o nome da minha🙄conta😇é pih😨rainha🥴mas tudo junto😎fica😝 pihrainha🤠🤠",
                "Nefesto 🤓 se tu tá se achando 😎 o melhorzao 🏆 vamo call privada 🚽 pó vamo ver 👀 quem é o macho 🦾 do discord 🤓 🌹",
                "olha🧐  isso minha👩‍🍼  pipoketi 🍿 gente olha🧐  aqui a sobrancelha😒  rosa 🌹 aprendam com a tileia🤨  voce 👉 nunca vai ser uma😡 🤬  pipoketi🍿",
                "Imagina 😶‍🌫️sair do clã 🛡️  top 1 liga 🥇 para apanhar 💀 pra 666 👺 todo evento 🤣",
                "Olha gente :oo:  fiquei tão feliz 😁 com meus ultimos dias na TBF 🥹 mais eu não é nada pessoal mais nã me senti ultilidades 🛠️ aqui na TBF  ⛏️ mais um dia a pessoa tem que partir 🤱 🐥 vou sentir falta de todos esperem que não🥹  fiquem com raiva 😡 ou odio🗯️  de min 🥲 ok foi minha escolha não sou um otimo farmer🤨  ok sou melhor em pvp🤺tipo essa semana mau 🤧 farmei ent digo adeus👨‍⚖️  espero ainda sejam meus 🤙 amigos👰‍♀️   e amigas adeus💃",
                "Se o ez life 😼 perdeu 🕵️ aqueles ovo 🤨 🤤  eu vo mata😡 ele🕴️",
                "Porque um grupo de random pegou no ovo da danzai? Aiai esses clans de hoje em dia não ganha da concorrência minúscula🙄 🙄",
                "😂 😂 😂 se tu procurava mapart boa no revo 😂 😭 , eu só lamento te dizer, mas 😂 😂 💋  a cultura de mapart do revo sempre foi lixo 🥁 🛒 🍗  e o mercado de mapart do revo sempre foi supersaturado 🌈 🏳️‍🌈  por um moleque 🧑‍✈️  com muito tempo 🕒  em suas mãos 🖐️  e cujo nome começa com R 🇷  mas se estiver aqui pode mandar mensagem 🗯️  porque sim, tu sempre foi meu rival 🏓  e tu sabe disso apesar de eu não ter nada contra ti e até gostar de artes ecchi 😳 😳 😳 😳 😳  mas concordar que no nosso mine isso não pertence 😡 🤬 , tem tanto site pra a gente ver ecchi 🇬 🇪 🇱 🇧 🇴 🇴 🇷 🇺  e tu quer botar no nosso mine 🎮 🎮 🎮  pqp vtnc RyanGamer2004 sai fora do nosso csw ⚔️",
                "NO FLOW 🍃😎 POR ONDE A GENTE PASSA 🚶🚶‍♂️🚶‍♀️É SHOW 🎉🎊🎇🥳 FECHOU 🔑🔑🔐E OLHA 👀👁️ ONDE A GENTE CHEGOU 💚🇧🇷 EU SOU 🗣️🗣️🗣️ PAÍS DO FUTEBOL ⚽🇧🇷🏟️🏟️ NEGÔ 👦🏿🇧🇷🇧🇷🇧🇷🇧🇷🇧🇷 ATÉ GRINGO SAMBOU 💃💃💃💃💃 TOCOU NEYMAR 🏃🏃🏃🏃 É GOL 🥅🥅⚽⚽⚽⚽⚽🇧🇷🇧🇷🇧🇷🇧🇷🇧🇷🇧🇷",
                "puta que pariu mano 😱 😱 😭  antigamente com 10 reais 💸 💵  cê ia no mercado 🏬 🛒 😋  comprava 1 quilo de arroz 🍚 🍙  1 quilo de carne 🥩 🍗 🍖 🥓  3 refrigerante 🍼 🥃 🍻  4 kinder ovo 🥚 🥚 🥚 🥚 hoje em dia não dá mais 😳 🫤  colocaram câmera nessa porra 😳 🎥 😅 😂 😂 😂 👮‍♀️ 😭 😭 😳 😳",
                "e  vc 🫵 um  tremendo 🥶 de  um  mal  educado 😡\nintrometido 💀  que  está  se  metendo 👉👌 no que  não 🚫 é  de  sua  conta🏦👨‍💻  preocupe-se  com  sua  vida🕵️🔪 se não ❌⛔ costuma  reclamar 🚔 do que  te  incomoda  parabéns 🎂👏  eu  reclamo  em  tom 💅 de  informação ℹ️💁 para  que seja  melhorado 📄 🐒  o sistema 💻 e não  em  tom de  reclamação 👮 do servidor 👯 ele  é  um dos  melhores ✅ entre  os  quais  já  joguei 🎲 e  o  elogio 🫀 😻  sempre  que  posso 👥 agora  respeito 🍷 🗿 é  o que  te  falta 🙅‍♂️ nunca  me  direcionei 🚙 a ninguém e muito  menos a  vc 🫵 😡 pois  nos  2  anos 🤒 🤨 que  jogo  aqui  sequer  te  vi 👁️ 🖥️  então  atenha-se 🫴 a  sua  insignificanica 🤏 e  preocupe-se 🔪 com seu  jogo 🎮   AMO 😍💘 O  REDEREVO ☢️⚠️ e   o Nevisk 🐻 e  o Gembrim  ⚧  sabem  disso 🕰️ mas  quando  precisar  reclamo 📣 sim 👌  e  respeito 🦾  todos  os  outros  que  o fazem 🤓",
                "af manow😔estava em u u um dia ruim🤒😕e polei😨da ponti😎mas a sorte🥳🤠foi que o😱😫LaNdZiNkGiNgUe😘😜amorteseu😵a queda😜😘",
                "Querido 🤗 eu treino 😉 PvP praticamente todos os 😻 😈 😎 😋 dias, tanto que na 🙊 war só morro 😜 para xitados, e logo dps 😉 😋 👉👌 😎 😻 são telados e banidos, o 😈 gameplay 😜 😻 😏 😜 não reclama de xitado , pq ele é 😋 👉👌 😉 o 😘 🙊 mais e todos 😻 sabem 😜 😈 😈 disso, eu não vou ficar aqui discutindo já ⏰ que vc saiu 😋 😉 😎 😏 😋 totalmente do 😏 😘 😼 😉 😻 tema da conversa e está 🙊 😜 😜 querendo ofender. . 😜 😼 👉👌",
                "Boa noite, 🌉  cidadãos 🧔‍♀️ do império 🦧 e membros 💩  da Skylla. Venha 🤒  por meio🧸  deste anunciar 😔  que o clã está pra 😎 passar por uma mudança 🌷 que 🔝 certamente🙀  marcará a 🫢 história do servidor. No dia primeiro de outubro,🤬  dois do maiores🙉  clãs existentes, a 🥃 Skylla e os🐷  Saqueadores. se unirão contra a 616, 🍎 formando a 🍋 coalisão que virá a 🐈‍⬛ ser conhecida como 🇱🇰 Odyssey 🦸 [Ody]. Aqueles que estão 🇧🇷 dispostos a jurar à nossa liderança e participar da 🇲🇳 nossa cruzada 🎆  contra as forças👿  da besta e seus seguidores, ✌️ informem à um dos líderes. A⚠️ guerra pode ser árdua e o inimigo poderoso, mas com fé e😦  dedicação nós seremos vitoriosos. Deus la Vult! 🫂",
                "😱😱Ow Ow.. ✋ Vamo esquecer essa porra ai..😖😖 Foi uma guerra de bosta!!💩💩💩 Mas Ow Ow Ow.. 😳😳 Jonas, Morgan 👧👧 F-F-F-Fala com o o o Thiago 👨‍🦲👩‍🦲 Ai velho 👴👴 Não tem condição 🛑🛑 de ir PVP ⚔️⚔️ Não cara!! 😢😢😢 Os cara tão mto xitado!! 👨‍💻👨‍💻👨‍💻 pelo amor de deus!! 🙏🙏🙏 Telso 🥶, Ragnar🐯 lá.. ta louco?? 🤯🤯 O Mocha.. 🦊🦊 é LIXOO 💩💩 Q-Queria pegar aql zoi gelado e esbugaiar!! 👀👀👀",
                "ELA 🧸 JOGOU 🧸 O 🧸 RABAO 🧸  LA 🧸  NA 🧸  SELVA 🧸 SE LAMBUZO COM POTE DI MEL 🧸  AMAÇO TUDO N A TROPA DU HOME 🧸  E NO REVERSE ELA SENTA NO PAU 🧸",
                "sim passam pano 🧹  pa valhalla 🪓🪓  , cara Entende Valhalla nao e o clan que o gebrim 🧑‍🦲🧑‍🦲   ama 😍😍😍 o gebrim paga pau 🥢  para taka 🤮  e sun 🌞 🌞   entende mano ele odeia 🤬  todos nois em 1 nivel que vc nao entende cara 🤯 , pq ele iria pagar pano 🧹🧹  para o clan que ta a lauraurbano que ela ja falou que odeia 🤬🤬 muito me explica isso, e sobre os autoclicker 🖱️🖱️   manda tela 🖥️  cara e para de chorar 😭😭😭  a porra 🥛  de todo o evento cara, o taayboy 🤮 do nada chegou ganhando 🥶  de todo mundo da vhl 🪓  em evento e no x1 tomava 1 pau 🥢  e o gebrim nao telo  🖥️  pq ou ele acha que a merda 💩  daql ant cheat 🖱️🖱️dele e bom ou e pq ele passa pano🧹🧹🧹, todo mundo sabe que o taayboy xita desdo careca 🧑‍🦲e ele mesmo assim nao tela 🖥️ 🖥️ 🖥️",
                "bom dia é o caralho, bati 24 punhetas e agora meu penis nao sobe mais, estou grandemente triste e desesperado pois acho que meu amigao ficou meio abalado e agora fica todo ecolhido, por favor alguem me ajuda? fui no medico mas ele nao pôde me ajudar infelizmente, se ja ocorreu com voce, me ajuda pf, estou completamente deprimido e cabisbaixo com esse acotecimeto."
            ]

            let Rand = msg[Math.floor(Math.random() * msg.length)]
            return int.reply({ content: `${Rand}` })
        }

        if(options.getSubcommand() == "profile") {
            const userTarget = options.getUser("user");
            const acharUser = int.guild.members.cache.get(userTarget.id);
            let fetchXp = await xp.fetch(userTarget.id, guildId)

            const permsObj = {
                CreateInstantInvite: '\`Criar convite instantâneo\`',
                KickMembers: '\`Expulsar membros\`',
                BanMembers: '\`Banir membros\`',
                Administrator: '\`Administrador\`',
                ManageChannels: '\`Gerenciar canais\`',
                ManageGuild: '\`Gerenciar servidor\`',
                AddReactions: '\`Adicionar reações\`',
                ViewAuditLog: '\`Ver registro de auditoria\`',
                PrioritySpeaker: '\`Voz Prioritária\`',
                Stream: '\`Ao vivo\`',
                ViewChannel: '\`Ver canais\`',
                SendMessages: '\`Enviar mensagens\`',
                SendTTSMessages: '\`Enviar mensagens em tts\`',
                ManageMessages: '\`Gerenciar mensagens\`',
                EmbedLinks: '\`Enviar links\`',
                AttachFiles: '\`Enviar anexos\`',
                ReadMessageHistory: '\`Ver histórico de mensagens\`',
                MentionEveryone: '\`Mencionar everyone e cargos\`',
                UseExternalEmojis: '\`Usar emojis externos\`',
                UseExternalStickers: '\`Usar figurinhas externas\`',
                ViewGuildInsights: '\`Ver análises do servidor\`',
                Connect: "\`Conectar em call's\`",
                Speak: `\`Falar em call's\``,
                MuteMembers: `\`Mutar membros\``,
                DeafenMembers: `\`Ensurdecer membros\``,
                MoveMembers: `\`Mover membros\``,
                UseVAD: `\`Utilizar detecção de voz\``,
                ChangeNickname: `\`Alterar apelido\``,
                ManageNicknames: `\`Gerenciar apelidos\``,
                ManageRoles: `\`Gerenciar cargos\``,
                ManageWebhooks: `\`Gerenciar webhooks\``,
                ManageEmojisAndStickers: `\`Gerenciar emojis e figurinhas\``,
                UseApplicationCommands: `\`Utilizar comandos slashs (/)\``,
                RequestToSpeak: `\`Pedir para falar\``,
                ManageEvents: `\`Gerenciar eventos\``,
                ManageThreads: `\`Gerenciar threads\``,
                CreatePublicThreads: `\`Criar threads públicas\``,
                CreatePrivateThreads: `\`Criar threads privadas\``,
                SendMessagesInThreads: `\`Falar em threads\``,
                UseEmbeddedActivities: `\`Iniciar atividades\``,
                ModerateMembers: `\`Gerenciar moderação do servidor\``
            }

            NameMcDatabase.findOne({ user: userTarget.id }, async(err, data) => {
                if(err) throw err;

                if(data) {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${userTarget.username}`})
                    .setThumbnail(`https://mc-heads.net/head/${data.nicks[0].nick}`)
                    .setColor('#2f2f3f')
                    .addFields(
                        {
                            name: ' Nome',
                            value: `\`\`\`${userTarget.tag}\`\`\``,
                            inline: true
                        },
                        {
                            name: `Identidade`,
                            value: `\`\`\`${data.nicks.map((w, i) => `${i+1}. ${w.nick}`).join(", ")}\`\`\``,
                            inline: true
                        },
                        {
                            name: ` Conta Criada`,
                            value: `<t:${~~(userTarget.createdTimestamp / 1000)}:f> (<t:${~~(userTarget.createdTimestamp / 1000)}:R>)`,
                            inline: false
                        },
                    )

            const botao1 = new ButtonBuilder()
            .setLabel('Permissões')
            .setStyle(ButtonStyle.Secondary)
            .setCustomId('verPerms')

            const botao2 = new ButtonBuilder()
            .setLabel('Punições')
            .setStyle(ButtonStyle.Secondary)
            .setCustomId('verPunish')

            if(!acharUser) botao1.setLabel('Não encontrado no servidor'), botao1.setDisabled(true), botao2.setDisabled(true)
            if(acharUser) embed.addFields({
                name: `Entrou em`,
                value: `<t:${~~(acharUser.joinedTimestamp / 1000)}:f> (<t:${~~(acharUser.joinedTimestamp / 1000)}:R>)`,
                inline: false
            }, {
                name: `Nivel`,
                value: `${fetchXp.level}`,
                inline: true
            },
            {
                name: 'Rank',
                value: `${fetchXp.rank}`,
                inline: true
            })

            const rowUser = new ActionRowBuilder().addComponents([botao1, botao2])
            let msgUser = await int.reply({ embeds: [embed], components: [rowUser], fetchReply: true })
            const coletorPerms = msgUser.createMessageComponentCollector({ componentType: ComponentType.Button, filter: (m) => m.member.id == int.user.id});

            coletorPerms.on("collect", async (interaction) => {
                if(interaction.customId == "verPerms") {
                    const permsArray = acharUser.permissions.toArray().map(p => permsObj[p])
                    const embedPerms = new EmbedBuilder().setColor('#2f2f3f').addFields(
                        {
                            name: "Maior cargo",
                            value: `${acharUser.roles.cache.sort((a, b) => b.position - a.position).first()}`,
                            inline: false,
                        },
                        {
                            name: `Permissões de ${userTarget.username}`,
                            value: `${permsArray.join(', ')}`
                        }
                    )

                    await interaction.reply({ embeds: [embedPerms], ephemeral: true })
                }

                if(interaction.customId == "verPunish") {
                    const userTag = `${userTarget.username}#${userTarget.discriminator}`;
                    WarnDatabase.findOne({ GuildId: guildId, UserId: userTarget.id, UserTag: userTag }, async(err, data) => {
                        if(err) throw err;

                        if(data) {
                            let data_conta = userTarget.createdAt.toLocaleString();
                            let id = userTarget.id;
                            let tag = userTarget.tag;
                            
                            const embedPusni = new EmbedBuilder()
                            .setColor('#2f2f3f')
                            .setDescription(`${data.Content.map((w, i) => 
                                `**WARN:** ${i + 1}
                                **Por:** ${w.ExecuterTag}
                                **Data:** ${w.Date}
                                **Motivo:** ${w.Reason}
                                **Provas:** ${w.Evidence}\n\n
                                `
                            ).join(" ")}`)
                            .setFooter({ text: userTag, iconURL: userTarget.displayAvatarURL({ dynamic: true }) })
        
                            return msgUser.edit({ embeds: [embedPusni], components: [] })
                        } else {
                            return msgUser.edit({ content: 'Este usuário não tem punições!', components: [] })
                        }
                    })
                }
            })
                } else {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${userTarget.username}`})
                    .setThumbnail(userTarget.displayAvatarURL({ dynamyc: true}))
                    .setColor('#2f2f3f')
                    .addFields(
                        {
                            name: ' Nome',
                            value: `\`\`\`${userTarget.tag}\`\`\``,
                            inline: true
                        },
                        {
                            name: ` Conta Criada`,
                            value: `<t:${~~(userTarget.createdTimestamp / 1000)}:f> (<t:${~~(userTarget.createdTimestamp / 1000)}:R>)`,
                            inline: false
                        },
                    )

            const botao1 = new ButtonBuilder()
            .setLabel('Permissões')
            .setStyle(ButtonStyle.Secondary)
            .setCustomId('verPerms')

            const botao2 = new ButtonBuilder()
            .setLabel('Punições')
            .setStyle(ButtonStyle.Secondary)
            .setCustomId('verPunish')

            if(!acharUser) botao1.setLabel('Não encontrado no servidor'), botao1.setDisabled(true), botao2.setDisabled(true)
            if(acharUser) embed.addFields({
                name: `Entrou em`,
                value: `<t:${~~(acharUser.joinedTimestamp / 1000)}:f> (<t:${~~(acharUser.joinedTimestamp / 1000)}:R>)`,
                inline: false
            }, {
                name: `Nivel`,
                value: `${fetchXp.level}`,
                inline: true
            },
            {
                name: 'Rank',
                value: `${fetchXp.rank}`,
                inline: true
            })

            const rowUser = new ActionRowBuilder().addComponents([botao1, botao2])
            let msgUser = await int.reply({ embeds: [embed], components: [rowUser], fetchReply: true })
            const coletorPerms = msgUser.createMessageComponentCollector({ componentType: ComponentType.Button, filter: (m) => m.member.id == int.user.id});

            coletorPerms.on("collect", async (interaction) => {
                if(interaction.customId == "verPerms") {
                    const permsArray = acharUser.permissions.toArray().map(p => permsObj[p])
                    const embedPerms = new EmbedBuilder().setColor('#2f2f3f').addFields(
                        {
                            name: "Maior cargo",
                            value: `${acharUser.roles.cache.sort((a, b) => b.position - a.position).first()}`,
                            inline: false,
                        },
                        {
                            name: `Permissões de ${userTarget.username}`,
                            value: `${permsArray.join(', ')}`
                        }
                    )

                    await interaction.reply({ embeds: [embedPerms], ephemeral: true })
                }

                if(interaction.customId == "verPunish") {
                    const userTag = `${userTarget.username}#${userTarget.discriminator}`;
                    WarnDatabase.findOne({ GuildId: guildId, UserId: userTarget.id, UserTag: userTag }, async(err, data) => {
                        if(err) throw err;

                        if(data) {
                            let data_conta = userTarget.createdAt.toLocaleString();
                            let id = userTarget.id;
                            let tag = userTarget.tag;
                            
                            const embedPusni = new EmbedBuilder()
                            .setColor('#2f2f3f')
                            .setDescription(`${data.Content.map((w, i) => 
                                `**ID:** ${i + 1}
                                **Por:** ${w.ExecuterTag}
                                **Data:** ${w.Date}
                                **Motivo:** ${w.Reason}
                                **Provas:** ${w.Evidence}\n\n
                                `
                            ).join(" ")}`)
                            .setFooter({ text: userTag, iconURL: userTarget.displayAvatarURL({ dynamic: true }) })
        
                            return msgUser.edit({ embeds: [embedPusni], components: [] })
                        } else {
                            return msgUser.edit({ content: 'Este usuário não tem punições!', components: [] })
                        }
                    })
                }
            })
                }
            })

            /*const userTag = `${userTarget.username}#${userTarget.discriminator}`;
            WarnDatabase.findOne({ GuildId: guildId, UserId: userTarget.id, UserTag: userTag }, async(err, data) => {
                if(err) throw err;

                
            })*/
        }

        if(options.getSubcommandGroup() == "warn") {
            if(!int.member.permissions.has(PermissionFlagsBits.KickMembers)) return int.reply({ content: `:x:`, ephemeral: true })
            const target = options.getUser('user');
            const membroTarget = options.getMember('user')
            const reason = options.getString("motivo") || "Nenhum motivo definido.";
            const evidence = options.getAttachment("provas") || "Nenhuma prova";
            const warnID = options.getInteger("id") - 1;

            const warnDate = new Date(int.createdTimestamp).toLocaleDateString();
            const userTag = `${target.username}#${target.discriminator}`;

            const embed1 = new EmbedBuilder();
            const embed2 = new EmbedBuilder();
            const embed3 = new EmbedBuilder();
            const embed4 = new EmbedBuilder();

            if(int.options.getSubcommand() == "add") {
                WarnDatabase.findOne({ GuildId: guildId, UserId: target.id, UserTag: userTag }, async(err, data) => {
                    if(err) throw err;
                    if(!data) {
                        data = new WarnDatabase({
                            GuildId: guildId,
                            UserId: target.id,
                            UserTag: userTag,
                            Content: [
                                {
                                    ExecuterId: user.id,
                                    ExecuterTag: user.tag,
                                    Reason: reason,
                                    Evidence: evidence,
                                    Date: warnDate
                                }
                            ],
                        });
                    } else {
                        const warnContent = {
                            ExecuterId: user.id,
                            ExecuterTag: user.tag,
                            Reason: reason,
                            Evidence: evidence,
                            Date: warnDate
                        }
                        data.Content.push(warnContent);
                    }
                    data.save();
                    embed1.setColor("#2f2f3f")
                    .setDescription(`
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:

                    <@${target.id}> você foi **AVISADO**, se continuar assim será banido

                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    `)
                    .setImage('https://cdn.discordapp.com/attachments/1066150324689190943/1066150509477625937/4fccf5a5267cbbd3eedaa4d7b3858a0b.png')
                    .setFooter({ text: userTag, iconURL: target.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                    embed2.setColor('#2f2f3f')
                    .setDescription(`
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:

                    <@${target.id}> você foi **AVISADO** e **MUTADO** por **1 HORA**, se continuar assim será banido

                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    `)
                    .setImage('https://cdn.discordapp.com/attachments/1066150324689190943/1066150757415538761/download_1.png')
                    .setFooter({ text: userTag, iconURL: target.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                    embed3.setColor('#2f2f3f')
                    .setDescription(`
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:

                    <@${target.id}> foi **AVISADO** e **MUTADO** por **1 SEMANA**, próxima vez será banido

                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    `)
                    .setImage('https://cdn.discordapp.com/attachments/1066150324689190943/1066150877779468328/Eej5_3fXkAAS45y.png')
                    .setFooter({ text: userTag, iconURL: target.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                    embed4.setColor('#2f2f3f')
                    .setDescription(`
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:

                    <@${target.id}> foi **AVISADO** **AVISADO** **AVISADO** e finalmente **BANIDO**

                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    :warning: **AVISO** :warning: **AVISO** :warning: **AVISO** :warning:
                    `)
                    .setImage('https://cdn.discordapp.com/attachments/1066150324689190943/1066151075809329212/download.png')
                    .setFooter({ text: userTag, iconURL: target.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                    if(data.Content.length == 1) {
                        return int.reply({ embeds: [embed1], content: `<@${target.id}>` })
                    }
                    if(data.Content.length == 2) {
                        membroTarget.timeout(3600000, "Mute - 2 warn")
                        return int.reply({ embeds: [embed2], content: `<@${target.id}>` })
                    }
                    if(data.Content.length == 3) {
                        membroTarget.timeout(604800000, "Mute - 3 warn")
                        return int.reply({ embeds: [embed3], content: `<@${target.id}>` })
                    }
                    if(data.Content.length == 4) {
                        membroTarget.ban({ reason: "Ban - 4 warn" })

                        await WarnDatabase.findOneAndDelete({ GuildId: guildId, UserId: target.id, UserTag: userTag });
                        return int.reply({ embeds: [embed4], content: `<@${target.id}>` })
                    }
                });
            }
            if(int.options.getSubcommand() == "remove") {
                WarnDatabase.findOne({ GuildId: guildId, UserId: target.id, UserTag: userTag }, async(err, data) => {
                    if(err) throw err;

                    if(data) {
                        data.Content.splice(warnID, 1);
                        data.save();

                        const embedRemove = new EmbedBuilder()
                        .setColor('#2f2f3f')
                        .setDescription(`${userTag} aviso com numero ${warnID - 1} foi removido.`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()
                        return int.reply({ embeds: [embedRemove] })
                    } else {
                        const embedRemove2 = new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`${userTag} | ||${target.id}|| não tem avisos.`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()

                        return int.reply({ embeds: [embedRemove2] })
                    }
                });
            }
        if(int.options.getSubcommand() == "clear") {
            WarnDatabase.findOne({ GuildId: guildId, UserId: target.id, UserTag: userTag }, async(err, data) => {
                if(err) throw err;

                if(data) {
                    await WarnDatabase.findOneAndDelete({ GuildId: guildId, UserId: target.id, UserTag: userTag });

                        const embedClear = new EmbedBuilder()
                        .setColor("#2f2f3f")
                        .setDescription(`${userTag}, avisos apagados.`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()

                        return int.reply({ embeds: [embedClear] })
                    } else {
                        const embedClear2 = new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`${userTag} não tem avisos. | ||${target.id}||`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()

                        return int.reply({ embeds: [embedClear2] });
                    }
                })
            }
        }
        /* console.log(await this.client.dataServices.getUser(int.user.id))
        console.log(await this.client.dataServices.getWarns(int.user.id)) */
        let channelEventos = this.client.channels.cache.get("744270016639139911")
        
        if(int.options.getSubcommand() == "arma") {
            if(!int.member.permissions.has(PermissionFlagsBits.KickMembers)) return int.reply({ content: `:x:`, ephemeral: true })
        
            let choice = int.options.getString('evento')
            if(choice == "war") {
                let embedWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ WAR GÊNESIS HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:00**
                    **↳ :flag_pt: 22:00**
                    **↳ :clock: logue 1 hora ANTES para organização/aquecimento**

                    **PREMIAÇÃO:**
                    **↳ <:arma_war:1061650916496916560> TROFÉU DE GUERRA**
                    **↳ <:coins:1065788544108470322> 100k para cada membro**

                    **PARTICIPAÇÃO:**
                    **↳ :knife: obrigatório a presença de <@&964025707355328602> <@&1001523602056806471> <@&964025747805208616>**
                    **↳ :bust_in_silhouette: 20 membros | mcmmo [ON] | itens próprios**
                    **↳ :arrow_down: mcON (itens próprios) marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    **<:XP:953349866678005760> - VOU DE BAÚ FDS**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedWar], content: `<@&985068394183290940>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                    msg.react('<:XP:953349866678005760>')
                })
            }

            if(choice == "prewar") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ PREWAR GÊNESIS HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 18:00**
                    **↳ :flag_pt: 21:00**
                    **↳ :clock: logue 1 hora ANTES para organização/aquecimento**

                    **PREMIAÇÃO:**
                    **↳ <:coins:1065788544108470322> 50k para cada membro**

                    **PARTICIPAÇÃO:**
                    **↳ :knife: obrigatório a presença de <@&964025707355328602> <@&1001523602056806471> <@&964025747805208616>**
                    **↳ :bust_in_silhouette: 20 membros | mcmmo [ON] | itens próprios**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    **<:cap:953349549664125018> - VOU DE BAÚ FDS**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394183290940>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                    msg.react('<:cap:953349549664125018>')
                })
            }

            if(choice == "cxc") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ CLÃ X CLÃ GÊNESIS HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:00**
                    **↳ :flag_pt: 22:00**
                    **↳ :clock: logue 1 hora ANTES para organização/aquecimento**

                    **PREMIAÇÃO:**
                    **↳ <:arma_cxc:1061650913913229483> TROFÉU DO CLÃ X Clã**
                    **↳ <:coins:1065788544108470322> 100k para cada membro**

                    **PARTICIPAÇÃO:**
                    **↳ :knife: obrigatório a presença de <@&964025707355328602> <@&1001523602056806471> <@&964025747805208616>**
                    **↳ :bust_in_silhouette: 10 membros | mcmmo [ON] | itens próprios**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394183290940>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "glad") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ GLADIADOR GÊNESIS HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:00**
                    **↳ :flag_pt: 22:00**

                    **PREMIAÇÃO:**
                    **↳ <:arma_gladiador:1061652515130724423> MACHADO DO GLADIADOR**
                    **↳ <:coins:1065788544108470322> 100k para o vencedor**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: evento 1x1 | mcmmo [ON] | itens setados**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394183290940>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "arqueiro") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ ARQUEIRO GÊNESIS HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:00**
                    **↳ :flag_pt: 22:00**

                    **PREMIAÇÃO:**
                    **↳ <:arma_arqueiro:1061653656581189663> ARCO DO EVENTO**
                    **↳ <:coins:1065788544108470322> 100k para o vencedor**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: evento 1x1 | mcmmo [ON] | itens próprios**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394183290940>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "killer") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ KILLER GÊNESIS HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:00**
                    **↳ :flag_pt: 22:00**

                    **PREMIAÇÃO:**
                    **↳ <:arma_arqueiro:1061653656581189663> ESPADA KILLER**
                    **↳ <:coins:1065788544108470322> 100k para o matador**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: ∞ membros | mcmmo [OFF] | itens setados**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    **<:cap:953349549664125018> - VOU DROPAR ITEM**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394183290940>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                    msg.react('<:cap:953349549664125018>')
                })
            }
        }

        if(int.options.getSubcommand() == "revo") {
            if(!int.member.permissions.has(PermissionFlagsBits.KickMembers)) return int.reply({ content: `:x:`, ephemeral: true })
        
            let choice = int.options.getString('evento')
            if(choice == "superwar") {
                let embedWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ SUPERWAR REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 18:00**
                    **↳ :flag_pt: 21:00**
                    **↳ <:tag:1066132414348402818> logue 1 hora ANTES para organização/aquecimento**

                    **PREMIAÇÃO:**
                    **↳ <:revo_war:1061708405393338409> TROFÉU DE SUPER GUERRA**
                    **↳ <:coins:1065788544108470322> 5kk para o banco do clã**
                    **↳ <:tag:1066132414348402818> TAG [MITO] para o matador**

                    **PARTICIPAÇÃO:**
                    **↳ :knife: obrigatório a presença de <@&964025707355328602> <@&1001523602056806471> <@&964025747805208616>**
                    **↳ :bust_in_silhouette: 15 membros | itens próprios | mcmmo [ON] | drop [ON]**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    **<:XP:953349866678005760> - VOU DE BAÚ FDS**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                    msg.react('<:XP:953349866678005760>')
                })
            }

            if(choice == "guerra") {
                let embedWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ WAR REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 18:00**
                    **↳ :flag_pt: 21:00**
                    **↳ :clock: logue 1 hora ANTES para organização/aquecimento**

                    **PREMIAÇÃO:**
                    **↳ <:revo_war:1061708405393338409> TROFÉU DE GUERRA**
                    **↳ <:coins:1065788544108470322> 1kk para o banco do clã**
                    **↳ <:tag:1066132414348402818> TAG [MITO] para o matador**

                    **PARTICIPAÇÃO:**
                    **↳ :knife: obrigatório a presença de <@&964025707355328602> <@&1001523602056806471> <@&964025747805208616>**
                    **↳ :bust_in_silhouette: 15 membros | itens próprios | mcmmo [ON] **
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    **<:XP:953349866678005760> - VOU DE BAÚ FDS**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                    msg.react('<:XP:953349866678005760>')
                })
            }

            if(choice == "prewaron") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ PREWAR MCON REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:30**
                    **↳ :flag_pt: 22:30**
                    **↳ :clock: logue 1 hora ANTES para organização/aquecimento**

                    **PREMIAÇÃO:**
                    **↳ <:coins:1065788544108470322> 250k para o banco do clã**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: 15 membros | itens setados | mcmmo [ON] **
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    **<:cap:953349549664125018> - VOU DE BAÚ FDS**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                    msg.react('<:cap:953349549664125018>')
                })
            }

            if(choice == "prewaroff") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ PREWAR MCOFF REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:30**
                    **↳ :flag_pt: 22:30**
                    **↳ :clock: logue 1 hora ANTES para organização/aquecimento**

                    **PREMIAÇÃO:**
                    **↳ <:coins:1065788544108470322> 250k para o banco do clã**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: 15 membros | itens setados | mcmmo [OFF] **
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    **<:cap:953349549664125018> - VOU DE BAÚ FDS**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                    msg.react('<:cap:953349549664125018>')
                })
            }

            if(choice == "cxc") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ CLÃ X CLÃ REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:30**
                    **↳ :flag_pt: 22:30**
                    **↳ :clock: logue 1 hora ANTES para organização/aquecimento**

                    **PREMIAÇÃO:**
                    **↳ <:revo_cxc:1062150244395139114> TROFÉU DO CLÃ X Clã**
                    **↳ <:tag:1066132414348402818> TAG [Campeã(o)] durante 7 dias**
                    **↳ <:coins:1065788544108470322> 50k para o Matador**

                    **PARTICIPAÇÃO:**
                    **↳ :knife: obrigatório a presença de <@&964025707355328602> <@&1001523602056806471> <@&964025747805208616>**
                    **↳ :bust_in_silhouette: 5 membros | itens setados | mcmmo [ON] **
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "guerreiro") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ GUERREIRO REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 15:00**
                    **↳ :flag_pt: 18:00**

                    **PREMIAÇÃO:**
                    **↳ <:revo_guerreiro:1062147486979993690> ESPADA DO GUERREIRO**
                    **↳ <:tag:1066132414348402818> TAG [Guerreiro(a)] durante 7 dias**
                    **↳ <:coins:1065788544108470322> 150k para o vencedor**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: evento 1x1 | itens setados | mcmmo [OFF]**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "gladiador") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ GLADIADOR REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 18:00**
                    **↳ :flag_pt: 21:00**

                    **PREMIAÇÃO:**
                    **⛧ Ultimo Sobrevivente**
                    **↳ <:revo_gladiador:1061652513096482826> MACHADO DO CAMPEÃO**
                    **↳ <:tag:1066132414348402818> TAG [Gladiador(a)] durante 7 dias**
                    **↳ <:coins:1065788544108470322> 150k**
                    **⛧ Matador**
                    **↳ <:coins:1065788544108470322> 100k**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: ∞ membros | itens setados | mcmmo [ON]**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "besteiro") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ BESTEIRO REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 15:00**
                    **↳ :flag_pt: 18:00**

                    **PREMIAÇÃO:**
                    **⛧ Ultimo Sobrevivente**
                    **↳ <:phantom:1066133019838120056> CONTADOR DE BLOCOS**
                    **↳ <:tag:1066132414348402818> TAG [Besteiro(a)] durante 7 dias**
                    **↳ <:coins:1065788544108470322> 100k**
                    **⛧ Matador**
                    **↳ <:coins:1065788544108470322> 50k**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: ∞ membros | itens setados | mcmmo [ON]**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "arqueiro") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ ARQUEIRO REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 15:00**
                    **↳ :flag_pt: 18:00**

                    **PREMIAÇÃO:**
                    **⛧ Matador**
                    **↳ <:revo_arqueiro:1062158525826072606> CONTADOR DE SACRIFÍCIOS**
                    **↳ <:tag:1066132414348402818> TAG [Sniper] durante 7 dias**
                    **↳ <:coins:1065788544108470322> 50k para o vencedor**
                    **⛧ Ultimo Sobrevivente**
                    **↳ <:coins:1065788544108470322> 100k**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: ∞ membros | itens setados | mcmmo [OFF]**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "killer") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ KILLER REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:30**
                    **↳ :flag_pt: 22:30**

                    **PREMIAÇÃO:**
                    **⛧ Matador**
                    **↳ <:revo_killer:1062153435610349628> CONTADOR DE ALMAS**
                    **↳ <:tag:1066132414348402818> TAG [Killer] durante 7 dias**
                    **↳ <:coins:1065788544108470322> 150k para o vencedor**
                    **⛧ Ultimo Sobrevivente**
                    **↳ <:coins:1065788544108470322> 100k**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: ∞ membros | itens setados | mcmmo [OFF]**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "lanceiro") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ LANCEIRO REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 17:00**
                    **↳ :flag_pt: 20:00**

                    **PREMIAÇÃO:**
                    **⛧ Matador**
                    **↳ <:tag:1066132414348402818> TAG [Lanceiro(a)] durante 7 dias**
                    **↳ <:coins:1065788544108470322> 50k**
                    **⛧ Ultimo Sobrevivente**
                    **↳ <:coins:1065788544108470322> 100k**

                    **PARTICIPAÇÃO:**
                    **↳ :bust_in_silhouette: ∞ membros | itens setados | mcmmo [OFF]**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }

            if(choice == "dominador") {
                let embedPreWar = new EmbedBuilder()
                .setAuthor({ name: '⚠️ DOMINADOR REDEREVO HOJE ⚠️', iconURL: this.client.user.avatarURL() })
                .setDescription(
                    `
                    **HORÁRIO:**
                    **↳ :flag_br: 19:30**
                    **↳ :flag_pt: 22:30**

                    **PREMIAÇÃO:**
                    **↳ <:tag:1066132414348402818> TAG [Lanceiro(a)] durante 7 dias**
                    **↳ <:coins:1065788544108470322> 150k**

                    **PARTICIPAÇÃO:**
                    **↳ :knife: obrigatório a presença de <@&964025707355328602> <@&1001523602056806471> <@&964025747805208616>**
                    **↳ :bust_in_silhouette: ∞ membros | itens próprios | mcmmo [ON]**
                    **↳ :arrow_down: marque presença**

                    **:white_check_mark: - RIP'N TEAR UNTIL ITS DONE**
                    **:x: - NÃO VOU <#1025322468308701275>**
                    `
                )
                .setColor('#2f2f3f')
                await int.reply({ content: `Enviado.`, ephemeral: true })
                return channelEventos.send({ embeds: [embedPreWar], content: `<@&985068394988597258>`, fetchReply: true }).then(msg => {
                    msg.react('✅')
                    msg.react('❌')
                })
            }
        }
    }
}