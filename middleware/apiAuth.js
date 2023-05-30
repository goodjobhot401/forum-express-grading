const passport = require('../config/passport')
const helpers = require('../helpers/auth-helpers')

const authenticated = passport.authenticate('jwt', { session: false })

const authenticatedAdmin = (req, res, next) => {
  // if (req.user && req.user.isAdmin) return next()
  if (helpers.getUser(req) && helpers.getUser(req).isAdmin) return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}

module.exports = {
  authenticated,
  authenticatedAdmin
}
