const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const api = require('./modules/api')

const fontEndController = require('../controllers/font-end-controller')

router.use('/api', api)
router.use('/admin', admin)

router.get('/our-story', fontEndController.getOurStoryPage)
router.get('/stores', fontEndController.getStoresPage)
router.get('/drinks', fontEndController.getDrinksPage)
router.get('/', fontEndController.getHomePage)

module.exports = router