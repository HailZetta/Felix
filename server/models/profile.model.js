const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  fullname: {type: String, required: true},
  tel: {type: String},
  city: {type: String},
  guestlist: [{type: Schema.Types.ObjectId, ref: 'guestlist'}],
  invitation: [{type: Schema.Types.ObjectId, ref: 'invitation'}],
})

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;