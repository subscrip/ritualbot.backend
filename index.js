const {IntentsBitField, Options} = require('discord.js')
const App = require('./src/app/AppLauntch')
const RitualBot = new App({
    intents: new IntentsBitField(65535),
    fetchAllMembers: true,
    messageCacheLifetime: 0,
    shardCount: 1,
    messageSweepInterval: 0,
    messageCacheMaxSize: 0,
    restTimeOffset: 0,
    failIfNotExists: false,
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    allowedMentions: { parse: ["roles", "everyone", "users"], repliedUser: true },
    makeCache: Options.cacheWithLimits({
      StageInstanceManager: 0,
      ThreadMemberManager: 0,
      GuildBanManager: 0,
      ApplicationCommandManager: 0,
      ApplicationCommandPermissionsManager: 0,
      GuildApplicationCommandManager: 0,
      GuildEmojiRoleManager: 0,
      GuildInviteManager: 0,
      MessageManager: 0,
      GuildBanManager: 0,
    }),
})

RitualBot.start({
    sourceCommands: './src/commands',
    sourceListeners: './src/listeners/discord'
});
