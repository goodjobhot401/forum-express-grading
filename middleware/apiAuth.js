const passport = require('../config/passport')
const helpers = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
  // 原本寫法為 const authenticated = passport.authenticate('jwt', { session: false })
  // 這樣的寫法只會回報 "錯誤" , 但不會呈現是 "串接資料錯誤" 還是 "身份驗證錯誤"
  // 所以在 passport.authenticate() 內部的第三個參數接上 cb, 自行補上處理錯誤訊息的 middleware, 方便前端理解
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: 'unauthorized' })
    // 但添加了 middleware 就要把 "成功" 與 "錯誤" 的狀況都處理
    // if() 判斷兩種 "失敗" 要執行的部分
    // "成功" 則要繼續讓 req.user 銜接 passport.authenticated() 回傳的 user 資料
    // 不然經過這層 middleware 之後, req.user 會變成空值 undefined
    req.user = user
    next()
  })(req, res, next) // 補上 (req, res, next) 其實就是 middleware 的形式, 繼續把資料網下傳遞
}

const authenticatedAdmin = (req, res, next) => {
  // if (req.user && req.user.isAdmin) return next()
  if (helpers.getUser(req) && helpers.getUser(req).isAdmin) return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}

module.exports = {
  authenticated,
  authenticatedAdmin
}
