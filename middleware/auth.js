const helper = require('../helpers/auth.-helpers')

const authenticated = (req, res, next) => {
  if (helper.ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/admin/login')
}

module.exports = authenticated 