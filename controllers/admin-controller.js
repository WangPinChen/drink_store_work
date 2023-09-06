const adminController = {
  loginPage: (req, res) => {
    res.render('admin/login')
    // res.render('adimn/login')
  },
  getDrinks: (req, res) => {
    res.render('admin/drinks')
  }
}

module.exports = adminController