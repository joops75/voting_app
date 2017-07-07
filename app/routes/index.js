'use strict'

var PollsHandler = require(process.cwd() + "/app/controllers/pollsHandler.server.js")

module.exports = function(app, passport) {
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/login')
        }
    }
    var pollsHandler = new PollsHandler()
    app.route('/')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(process.cwd() + '/public/home.html')
        })
    app.route('/login')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/loginpoll.html')
        })
    app.route('/logout')
        .get(function(req, res) {
            req.logout()
            res.redirect('/login')
        })
    app.route('/profile')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(process.cwd() + '/public/profile.html')
        })
    app.route('/api/:id')
        .get(isLoggedIn, function(req, res) {
            res.json(req.user.github)
        })
    app.route('/auth/github')
        .get(passport.authenticate('github'))
    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/login'
        }))
    app.route('/mypolls')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(process.cwd() + '/public/allpolls.html')
        })
    app.route('/allpolls')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/allpolls.html')
        })
    app.route('/poll/:name/:poll')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/allpolls.html')
        })
    app.route('/api/:id/polls')
        .get(isLoggedIn, pollsHandler.getMyPolls)
        .post(isLoggedIn, pollsHandler.updateMyPolls)
    app.route('/api/:id/allpolls')//':id' field required even though 'isLoggedIn' is not being called
        .get(pollsHandler.getAllPolls)
        .post(pollsHandler.updateAllPolls)
}