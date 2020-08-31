const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {type:String,required: true,maxLenght: 128},
    company: {type: String, maxLenght: 64},
    website: {type: String,maxLenght: 128},
    location: {type: String},
    description: {type:String,required: true},
    userId: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date},
    createdAt: {type: Date,default: Date.now}
  },
)

module.exports = mongoose.model('Project', projectSchema);
