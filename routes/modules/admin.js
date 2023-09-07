const express = require('express')
const passport = require('passport')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/login', adminController.loginPage)
// router.post('/login', passport.authenticate('local', { failureRedirect: '/admin/login', failureFlash: true }), adminController.login)
router.post('/login', passport.authenticate('local', { failureRedirect: '/admin/login' }), adminController.login)
router.get('/drinks', adminController.getDrinks)

module.exports = router