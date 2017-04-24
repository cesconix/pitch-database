const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  provider: String,
  profile: Schema.Types.Mixed,
  friends: Array,
  socket: {
    id: { type: String, required: false },
    status: { type: Number, default: -1 }
  },
  random: Number,
  created: { type: Date, default: Date.now }
})

UserSchema.statics.connect = (userId, socketId) => {
  this.findOneAndUpdate(
    { _id: userId },
    { 'socket.id': socketId, 'socket.status': 0 }
  )
}

UserSchema.statics.disconnect = (userId) => {
  this.findOneAndUpdate(
    { _id: userId },
    { 'socket.id': null, 'socket.status': -1 }
  )
}

// UserSchema.statics.checkSession = (session_id, callback) ->
//     return callback no if !!session_id is no
//     @findOne { 'session.session_id': session_id }, (err, user) ->
//         return callback yes if user?
//         return callback no
//
//
// UserSchema.statics.setStatus = (session_id, status, callback) ->
//     @findOneAndUpdate {'session.session_id': session_id}, {'session.status': status}, (err, user) ->
//         callback err, user
//
// UserSchema.statics.getRandom = (filter, callback) ->
//
//     rnd = Math.random()
//
//     queryGte =
//         @findOne()
//         .where('facebook_id').nin(filter.skip_fb_ids)
//         .where('session.status').equals(filter.status)
//         #.where('session.peer_id').ne(null)
//         .where('session.socket_id').ne(null)
//         .where('random').gte(rnd)
//
//     queryLte =
//         @findOne()
//         .where('facebook_id').nin(filter.skip_fb_ids)
//         .where('session.status').equals(filter.status)
//         #.where('session.peer_id').ne(null)
//         .where('session.socket_id').ne(null)
//         .where('random').lte(rnd)
//
//     queryGte.exec (err, user) ->
//         return callback user if user?
//         queryLte.exec (err, user) ->
//             callback user

module.exports = mongoose.model('User', UserSchema)
