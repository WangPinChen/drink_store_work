const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')

router.use('/admin', admin)

router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router