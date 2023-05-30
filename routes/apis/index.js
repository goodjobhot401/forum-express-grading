const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const restController = require('../../controllers/apis/restaurant-controller')

// use admin
router.use('/admin', admin)

// read restuarants
router.get('/restaurants', restController.getRestaurants)

module.exports = router
