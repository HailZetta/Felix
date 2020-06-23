const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  name: {type: String, required: true},
  name_en: {type: String},
  templateFile: {type: String},
  content: {type: Schema.Types.Mixed},
  status: {type: String, enum: ['enable', 'disable']}
});

const Template = mongoose.model('template', TemplateSchema);

module.exports = Template;