'use strict'

var UserCopys = require("../models/usersCopy.js")

function pollsHandler() {
    this.getMyPolls = function(req, res) {
        UserCopys.findOne({'github.id': req.user.github.id}, {"_id": false})
        .exec(function(err, result) {
            if (err) throw err
            res.json(result)
        })
    }
    this.updateMyPolls = function(req, res) {
        var data = JSON.parse(req.headers.statedata)
        UserCopys.findOneAndUpdate({'github.id': req.user.github.id},
            {
                'polls': data.polls
            }
        )
        .exec(function(err, result) {
            if (err) throw err
            res.json(result.polls)
        })
    }
    this.getAllPolls = function(req, res) {
        UserCopys.find({}, {"_id": false})
        .exec(function(err, result) {
            if (err) throw err
            res.json(result)
        })
    }
    this.updateAllPolls = function(req, res) {
        var data = JSON.parse(req.headers.statedata)
        UserCopys.findOneAndUpdate({'github.id': data.github.id},
            {
                'polls': data.polls
            }
        )
        .exec(function(err, result) {
            if (err) throw err
            res.json(result.polls)
        })
    }
}
module.exports = pollsHandler