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
    console.log(drink)
    console.log(req.body)
    const { name, note } = req.body
    const isPopular = req.body.isPopular ? true : false
    const isDelisted = req.body.isDelisted ? true : false

    drink.name = name;
    drink.note = note;
    drink.isPopular = isPopular;
    drink.isDelisted = isDelisted;

    await drink.save()
    res.redirect(`/admin/drinks/${req.params.id}`)
  }

}

module.exports = adminController