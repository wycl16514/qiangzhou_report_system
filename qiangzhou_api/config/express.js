var express = require('express');
var glob = require('glob');
var cors = require('cors');
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var passport = require('passport')
var path = require('path')
var compress = require('compression')

module.exports = function (app, config) {
    app.use(cors())
    app.use(morgan('dev'));
    app.use(express.json({ limit: "100mb" }))
    app.use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }))
    app.use(passport.initialize())
    app.use(cookieParser())
    app.use(compress())

    var controllers = glob.sync(config.root + '/controllers/*.js')
    controllers.forEach((controller) => {
        var routes = require(controller)
        app.use('/api/v1', routes)
    })

    var auth = glob.sync(config.root + '/auth/*.js')
    auth.forEach((auth) => {
        var routes = require(auth)
        app.use('/api/v1', routes)
    })
}
