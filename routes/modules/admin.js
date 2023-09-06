const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('admin/login')
})
router.get('/drinks', (req, res) => {
  res.render('admin/drinks')
})

module.exports = router