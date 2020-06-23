const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GuestListSchema = new Schema({
  fullname: {type: String},
  displayname: {type: String},
  tel: {type: String},
  email: {type: String},
  invitation: [{type: Schema.Types.ObjectId, ref: 'invitation'}],
})

const GuestList = mongoose.model('guestlist', GuestListSchema);

module.exports = GuestList;