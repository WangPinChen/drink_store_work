const Drink = require('../models/drink')
const Store = require('../models/store')
const City = require('../models/city')
const imgurFileHandler = require('../helpers/file-helpers')

const adminController = {
  loginPage: (req, res) => {
    res.render('admin/login')
    // res.render('adimn/login')
  },
  login: (req, res) => {
    res.redirect('/admin/drinks')
  },
  logout: (req, res) => {
    req.logout()
    req.flash('success_msg', '登出成功。')
    res.redirect('/admin/login')
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
    if (req.body.name === '') {
      req.flash('warning_msg', '名稱必須輸入')
      res.redirect('back')
    }
    let imagePath = ''
    if (req.file) {
      imagePath = await imgurFileHandler(req.file)
    }

    const drink = await Drink.findOne({ _id: req.params.id })

    if (imagePath.length > 0) drink.image = imagePath
    if (req.body.isNoImage === "Y") drink.image = ''
    drink.name = req.body.name
    drink.note = req.body.note
    drink.isPopular = req.body.isPopular ? true : false
    drink.isDelisted = req.body.isDelisted ? true : false

    await drink.save()
    req.flash('success_msg', '修改成功!')
    res.redirect(`/admin/drinks/${req.params.id}`)
  },
  postDrink: async (req, res) => {
    if (req.body.name === '') {
      req.flash('warning_msg', '名稱必須輸入')
      return res.redirect('/admin/drinks')
    }
    const file = req.file
    const filePath = await imgurFileHandler(file)

    await Drink.create({
      name: req.body.name,
      note: req.body.note,
      createdBy: req.user._id,
      image: filePath
    })
    req.flash('success_msg', '新增成功!')
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
  },
  getStoresPage: async (req, res) => {
    const cities = await City.find().lean()
    const stores = await Store.find().populate('cityId').lean()
    res.render('admin/stores', { stores, cities })
  },
  postStore: async (req, res) => {
    const createdBy = req.user._id
    const { name, cityId, address, phone } = req.body
    if (!name || !cityId || !address || !phone) {
      req.flash('warning_msg', '所有欄位都要輸入')
      res.redirect('back')
    }

    await Store.create({ name, cityId, address, phone, createdBy })
    req.flash('success_msg', '新增成功!')
    res.redirect('/admin/stores')
  },
  putStore: async (req, res) => {
    const { name, cityId, address, phone } = req.body
    if (!name || !cityId || !address || !phone) {
      req.flash('warning_msg', '所有欄位皆為必填')
      return res.redirect('back')
    }

    const store = await Store.findOne({ _id: req.params.id })
    if (!store) {
      req.flash('warning_msg', '要修改的門市不存在')
      return res.redirect('back')
    }

    store.name = req.body.name
    store.cityId = req.body.cityId
    store.address = req.body.address
    store.phone = req.body.phone

    await store.save()
    req.flash('success_msg', '編輯成功 !')
    res.redirect('/admin/stores')
  },
  deleteStore: async (req, res) => {
    const store = await Store.findOne({ _id: req.params.id })
    if (!store) {
      req.flash('warning_msg', '要刪除的門市不存在')
      res.redirect('back')
    }
    await store.remove()
    req.flash('success_msg', '刪除成功!')
    res.redirect('/admin/stores')
  }
}

module.exports = adminController