const mongoose = require('mongoose')
const config = require('pitch-config')

function connect () {
  mongoose.connect(config.database.uri, { server: { socketOptions: { keepAlive: 1 } } })
  mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database "${config.database.uri}"`)
  })
}

module.exports = {
  models: require('./models'),
  connect
}
