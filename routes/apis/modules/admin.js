const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/apis/admin-controller')
const upload = require('../../../middleware/multer')

// delete restuarnat
router.delete('/restaurants/:id', adminController.deleteRestaurant)

// create restaurant
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)

// read restaurants
router.get('/restaurants', adminController.getRestaurants)

module.exports = router
