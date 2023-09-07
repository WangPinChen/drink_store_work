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
  },
  getDrink: async (req, res) => {
    const drink = await Drink.findOne({ _id: req.params.id }).lean()
    res.render('admin/drink', { drink })
  },
  editDrinkPage: async (req, res) => {
    const drink = await Drink.findOne({ _id: req.params.id }).lean()
    res.render('admin/edit', { drink })
  }

}

module.exports = adminController