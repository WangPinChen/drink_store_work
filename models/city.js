const mongoose = require('mongoose')
const Schema = mongoose.Schema
const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  index: {
    type: Number
  }
})

module.exports = mongoose.model('City', citySchema)