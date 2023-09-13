const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const api = require('./modules/api')

router.use('/api', api)
router.use('/admin', admin)

router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router