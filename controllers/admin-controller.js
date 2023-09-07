const passport = require('passport')

const adminController = {
  loginPage: (req, res) => {
    res.render('admin/login')
    // res.render('adimn/login')
  },
  login: (req, res) => {
    res.redirect('/admin/drinks')
  },
  getDrinks: (req, res) => {
    res.render('admin/drinks')
  }
}

module.exports = adminController