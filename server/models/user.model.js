const mongoose = require('mongoose');
const { schema } = require('./profile.model');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['user', 'admin'], required: true},
  profile: {type: Schema.Types.ObjectId, ref: 'profile'},
})

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;