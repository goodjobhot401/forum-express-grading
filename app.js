if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const { getUser } = require('./helpers/auth-helpers')
const handlebarsHelpers = require('./helper/handlebars-helpers')
const path = require('path')
const SESSION_SECRET = 'secret'
const passport = require('./config/passport')
const { pages, apis } = require('./routes')

const app = express()
const port = process.env.PORT || 3000
// const db = require('./models') 檢查資料庫連線用, npm run dev 沒問題代表連線成功

// view template
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

// body-parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
// passport, 初始化&啟動 session 功能
app.use(passport.initialize())
app.use(passport.session())
// method-override
app.use(methodOverride('_method'))
// path
app.use('/upload', express.static(path.join(__dirname, 'upload')))
// flash
app.use(flash())
// flash middleware
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = getUser(req)
  next()
})
// routes
app.use('/api', apis)
app.use(pages)

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

module.exports = app
