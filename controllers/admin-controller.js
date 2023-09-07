const Drink = require('../models/drink')

const adminController = {
  loginPage: (req, res) => {
    res.render('admin/login')
    // res.render('adimn/login')
  },
  login: (req, res) => {
    res.redirect('/admin/drinks')
  },
  getDrinks: async (req, res) => {
    const drinks = await Drink.find().lean().sort({ name: 'asc' })
    res.render('admin/drinks', { drinks })
  }
}

module.exports = adminController