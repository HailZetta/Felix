const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invitationTypeSchema = new Schema({
  type: {type: String, required: true},
  type_en: {type: String},
  template: [{type: Schema.Types.ObjectId, ref: 'template'}]
})

const InvitationType = mongoose.model('invitationType', invitationTypeSchema);

module.exports = InvitationType;