const Drink = require('../models/drink')

const fontEndController = {
  getHomePage: async (req, res) => {
    const TOP_DRINK_COUNT = 6
    const topDrinks = await Drink.find({ isPopular: true, isDelisted: false }).limit(TOP_DRINK_COUNT).lean()
    if (topDrinks.length < TOP_DRINK_COUNT) {

      const addDrinks = await Drink.find({ isPopular: false, isDelisted: false }).limit(TOP_DRINK_COUNT - topDrinks.length).lean()
      topDrinks.push(...addDrinks)
      console.log(topDrinks)
    }

    res.render('home', { topDrinks })
  }
}

module.exports = fontEndController