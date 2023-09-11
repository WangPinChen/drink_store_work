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
  },
  postDrink: async (req, res) => {
    await Drink.create({
      name: req.body.name,
      note: req.body.note,
      createdBy: req.user._id
    })
    res.redirect('/admin/drinks')
  },
  deleteDrink: async (req, res) => {
    const drink = await Drink.findOne({ _id: req.params.id })
    if (!drink) {
      console.log('飲品不存在')
      res.redirect('/admin/drinks')
    }
    await drink.remove()
    res.redirect('/admin/drinks')
  },
  searchDrink: async (req, res) => {
    const { keyword } = req.body
    if (!keyword || keyword.trim() === '') {
      console.log('關鍵字無效')
      return res.redirect('back')
    }
    const searchDrinks = await Drink.find({ name: { $regex: keyword, $options: 'i' } }).lean()
    if (searchDrinks.length === 0) {
      const message = `很抱歉，輸入之關鍵字『${keyword}』未有任何匹配結果。`
      return res.render('admin/drinks', { keyword, message })
    }
    res.render('admin/drinks', { drinks: searchDrinks, keyword })
  }
}

module.exports = adminController