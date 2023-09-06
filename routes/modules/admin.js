const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/login', adminController.loginPage)
router.get('/drinks', adminController.getDrinks)

module.exports = router