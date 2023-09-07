if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const User = require('../user')
const db = require('../../config/mongoose')


db.once('open', () => {
  bcrypt.hash('root', 10)
    .then(hash => {
      User.create({
        account: 'root',
        password: hash
      })
        .then(() => {
          console.log('seeder created ')
          process.exit()
        })
    })
})