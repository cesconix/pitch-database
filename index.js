const mongoose = require('mongoose')
const config = require('pitch-config')

const util = require('util')
const debug = require('debug')('pitch-database:index')

function connect () {
  mongoose.connect(config.database.uri, { server: { socketOptions: { keepAlive: 1 } } })
  mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database "${config.database.uri}"`)
  })
}

mongoose.set('debug', (collectionName, method, query, doc) => {
  debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
})

module.exports = {
  models: require('./models'),
  connect
}
