const express = require('express')
const { apiErrorHandler } = require('../../middleware/error-handler')
const router = express.Router()
const admin = require('./modules/admin')
const restController = require('../../controllers/apis/restaurant-controller')

// use admin
router.use('/admin', admin)

// read restuarants
router.get('/restaurants', restController.getRestaurants)

// error
router.use('/', apiErrorHandler)

module.exports = router
