const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContentInvitationSchema = new Schema({
  contentlist: {type: Schema.Types.Mixed}
})

const Content = mongoose.model('content', ContentInvitationSchema);

module.exports = Content;