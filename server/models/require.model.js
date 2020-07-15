const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequireSchema = new Schema({
  name: { type: String },
  tel: { type: String },
  email: { type: String },
  type: { type: String },
  request: {type: String }
})

const Require = mongoose.model('require', RequireSchema);

module.exports = Require;