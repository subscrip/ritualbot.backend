const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    id: { type: String, default: "" },
})

module.exports = model('User', UserSchema)