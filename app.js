if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const router = require('./routes')
const { getUser } = require('./helpers/auth.-helpers')
const PORT = 3000
const app = express()

require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(flash())
app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(express.static('public'))
usePassport(app)
app.use((req, res, next) => {
  res.locals.user = getUser(req)
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(router)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})