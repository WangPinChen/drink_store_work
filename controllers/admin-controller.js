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
  },
  putDrink: async (req, res) => {
    const drink = await Drink.findOne({ _id: req.params.id })

    drink.name = req.body.name;
    drink.note = req.body.note;
    drink.isPopular = req.body.isPopular ? true : false
    drink.isDelisted = req.body.isDelisted ? true : false

    await drink.save()
    res.redirect(`/admin/drinks/${req.params.id}`)
  }

}

module.exports = adminController