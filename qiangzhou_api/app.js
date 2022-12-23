require('dotenv').config()
var express = require('express'), mongoose = require('mongoose'), path = require('path')
rootPath = path.normalize(__dirname), port = process.env.PORT || 3000, glob = require('glob')

var config = {
    root: rootPath,
    port: port,
    db: process.env.MONGODB_CONNECTION
}

const connectDB = async () => {
    try {
        await mongoose.connect(config.db);
        console.log('Mongo DB connect ok')
        var models = glob.sync(config.root + '/models/*.js');
        models.forEach((model) => {
            require(model)
        })
        console.log('after init models')

        var app = express();
        require('./config/express')(app, config)
        var server = app.listen(config.port, () => {
            console.log('server start on port: ', config.port)
        })
    } catch (err) {
        console.log('Fail to connect to db: ', err);
        return false;
    }
}

connectDB();
