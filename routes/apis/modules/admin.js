const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/apis/admin-controller')

// delete restuarnat
router.delete('/restaurants/:id', adminController.deleteRestaurant)

// read restaurants
router.get('/restaurants', adminController.getRestaurants)

module.exports = router
