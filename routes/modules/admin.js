const express = require('express')
const passport = require('passport')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/drinks/:id/edit', adminController.editDrinkPage)
router.delete('/drinks/:id/delete', adminController.deleteDrink)
router.post('/drinks/search', adminController.searchDrink)
router.get('/drinks/:id', adminController.getDrink)
router.put('/drinks/:id', adminController.putDrink)
router.get('/login', adminController.loginPage)
// router.post('/login', passport.authenticate('local', { failureRedirect: '/admin/login', failureFlash: true }), adminController.login)
router.post('/login', passport.authenticate('local', { failureRedirect: '/admin/login' }), adminController.login)
router.post('/drinks', adminController.postDrink)
router.get('/drinks', adminController.getDrinks)

module.exports = router