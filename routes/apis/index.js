const express = require('express')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../../middleware/apiAuth')
const router = express.Router()
const admin = require('./modules/admin')
const passport = require('../../config/passport')
const restController = require('../../controllers/apis/restaurant-controller')
const userController = require('../../controllers/apis/user-controller')

// use admin
router.use('/admin', authenticated, authenticatedAdmin, admin)

// read restuarants
router.get('/restaurants', authenticated, restController.getRestaurants)

// user signin
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)

// error
router.use('/', apiErrorHandler)

module.exports = router
