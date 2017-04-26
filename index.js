const mongoose = require('mongoose')
const debug = require('debug')('pitch-database')
const config = require('pitch-config')

const models = require('./models')

mongoose.Promise = require('bluebird')

mongoose.connection.on('connected', () => {
  debug(`Connected to "${config.database.uri}" db.`)
})

mongoose.connection.on('error', (err) => {
  debug(`Failed to connect to "${config.database.uri}" db.`, err)
})

mongoose.connection.on('disconnected', () => {
  debug(`Mongoose default connection to "${config.database.uri}" db disconnected.`)
})

function connect () {
  try {
    mongoose.connect(config.database.uri, {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    })
    debug(`Trying to connect to db "${config.database.uri}".`)
  } catch (err) {
    debug(`Sever initialization failed: ${err.message}.`)
  }
}

function gracefulExit () {
  mongoose.connection.close(() => {
    process.exit(0)
  })
}

process
  .on('SIGINT', gracefulExit)
  .on('SIGTERM', gracefulExit)

module.exports = { models, connect }
