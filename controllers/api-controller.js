const User = require('../models/user')

const apiController = {
  getUser: async (req, res) => {
    const user = await User.findOne({ _id: req.user._id }, '-password').lean()
    res.json(user)
  }
}

module.exports = apiController