const express = require('express')
const { apiErrorHandler } = require('../../middleware/error-handler')
const router = express.Router()
const admin = require('./modules/admin')
const passport = require('../../config/passport')
const restController = require('../../controllers/apis/restaurant-controller')
const userController = require('../../controllers/apis/user-controller')

// use admin
router.use('/admin', admin)

// user signin
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)

// read restuarants
router.get('/restaurants', restController.getRestaurants)

// error
router.use('/', apiErrorHandler)

module.exports = router
