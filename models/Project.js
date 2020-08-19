const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
      type:String,
      required: true,
      maxLenght: 128
    },
    company: {
      type: String,
      maxLenght: 64
    },
    companyWebsite: {
      type: String,
      maxLenght: 128
    },
    location: {
      type: String
    },
    description: {
      type:String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
)

module.exports = mongoose.model('Project', projectSchema);
