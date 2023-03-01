const {Schema, model} = require('mongoose');

const WarnSchema = new Schema({
    GuildId: String,
    UserId: String,
    UserTag: String,
    Content: Array,
})

module.exports = model('Warn', WarnSchema)