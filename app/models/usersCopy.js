'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var UserCopy = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String,
        publicRepos: Number
    },
    polls: Array
})

module.exports = mongoose.model('UserCopy', UserCopy)