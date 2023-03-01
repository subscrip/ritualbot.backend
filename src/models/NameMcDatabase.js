const {Schema, model} = require('mongoose');

const NameMC = new Schema({
    user: String,
    nicks: Array
})

module.exports = model('NameMC', NameMC)