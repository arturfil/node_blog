const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  title: {type: String, required: true, maxlength: 96},
  subTitle: {type: String, required: true},
  content: {type: String, required: true},
  title: {type: String, required: true},
  status: {type: String, default: 'draft', enum: ['draft', 'published']},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Blog', blogSchema);