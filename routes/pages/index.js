const express = require('express')
const { generalErrorHandler } = require('../../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../../middleware/auth')
const passport = require('../../config/passport')
const router = express.Router()
const upload = require('../../middleware/multer')
const restController = require('../../controllers/pages/restaurant-controller')
const userController = require('../../controllers/pages/user-controller')
const commentController = require('../../controllers/pages/comment-controller')
const admin = require('./modules/admin')

// admin
router.use('/admin', authenticatedAdmin, admin)

// user signup
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

// user signin
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true
}), userController.signIn)

// user logout
router.get('/logout', userController.logout)

// restaurant top
router.get('/restaurants/top', authenticated, restController.getTopRestaurants)

// restaurant feeds
router.get('/restaurants/feeds', authenticated, restController.getFeeds)

// restaurant detail
router.get('/restaurants/:id', authenticated, restController.getRestaurant)

// restaurant dashboard
router.get('/restaurants/:id/dashboard', authenticated, restController.getDashboard)

// restaurant index
router.get('/restaurants', authenticated, restController.getRestaurants)

// comment create
router.post('/comments', authenticated, commentController.postComment)

// comment delete
router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)

// favorite create & delete
router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)

// like create & delete
router.post('/like/:restaurantId', authenticated, userController.addLike)
router.delete('/like/:restaurantId', authenticated, userController.removeLike)

// following create & delete
router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete('/following/:userId', authenticated, userController.removeFollowing)

// user top-users
router.get('/users/top', authenticated, userController.getTopUsers)

// user profile edit
router.get('/users/:id/edit', authenticated, userController.editUser)
router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)

// user profile
router.get('/users/:id', authenticated, userController.getUser)

router.get('/', (req, res) => res.redirect('/restaurants'))

// error
router.use('/', generalErrorHandler)

module.exports = router
