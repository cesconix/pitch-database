const mongoose = require('mongoose')
const debug = require('debug')('pitch-database')

const models = require('./models')

function connect (uri) {
  mongoose.Promise = require('bluebird')

  mongoose.connection.on('connected', () => {
    debug(`Connected to "${uri}" db.`)
  })

  mongoose.connection.on('error', (err) => {
    debug(`Failed to connect to "${uri}" db.`, err)
  })

  mongoose.connection.on('disconnected', () => {
    debug(`Mongoose default connection to "${uri}" db disconnected.`)
  })

  try {
    mongoose.connect(uri, {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    })
    debug(`Trying to connect to db "${uri}".`)
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
