const Drink = require('../models/drink')
const Store = require('../models/store')
const City = require('../models/city')

const fontEndController = {
  getHomePage: async (req, res) => {
    const TOP_DRINK_COUNT = 6
    const topDrinks = await Drink.find({ isPopular: true, isDelisted: false }).limit(TOP_DRINK_COUNT).lean()
    if (topDrinks.length < TOP_DRINK_COUNT) {
      const addDrinks = await Drink.find({ isPopular: false, isDelisted: false }).limit(TOP_DRINK_COUNT - topDrinks.length).lean()
      topDrinks.push(...addDrinks)
    }
    res.render('home', { topDrinks })
  },
  getDrinksPage: async (req, res) => {
    const cities = await City.find().lean()
    const stores = await Store.find().populate('cityId').lean()

    stores.forEach(store => {
      store.fullAddress = store.cityId.name + store.address
    })

    res.render('stores', { cities, stores })
  }
}

module.exports = fontEndController