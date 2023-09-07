const mongoose = require('mongoose')
const Schema = mongoose.Schema
const drinkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  desc: {
    type: String,
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isDelisted: {
    type: Boolean,
    default: false
  },
  note: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Drink', drinkSchema)