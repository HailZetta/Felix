const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
  type: {type: Schema.Types.ObjectId, ref: 'invitationType'},
  template: {type: Schema.Types.ObjectId, ref: 'template'},
  content: {type: Schema.Types.Mixed},
  guestlist: [{type: Schema.Types.ObjectId, ref: 'guestlist'}],
  status: {type: String},
})

const Invitation = mongoose.model('invitation', InvitationSchema);

module.exports = Invitation;