const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sotreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    index: true,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Store', sotreSchema)