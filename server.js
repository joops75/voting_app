'use strict'

var express = require("express"),
    routes = require("./app/routes/index.js"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    session = require("express-session")
var app = express()
require("dotenv").load()
require("./app/config/passport")(passport)
var port = process.env.PORT || 3000
var address = process.env.IP || '127.0.0.1:27017'

mongoose.connect(process.env.MONGO_URI || 'mongodb://' + address + '/voting_app')

app.use('/public', express.static(process.cwd() + '/public'))
app.use('/common', express.static(process.cwd() + '/app/common'))
app.use('/controllers', express.static(process.cwd() + '/app/controllers'))
app.use(session({
    secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

routes(app, passport)

app.listen(port)