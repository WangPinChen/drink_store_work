if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const faker = require('faker')
const bcrypt = require('bcryptjs')
const User = require('../user')
const Store = require('../store')
const Drink = require('../drink')
const City = require('../city')
const db = require('../../config/mongoose')


const seedData = {
  users: {
    account: "admin",
    password: "12345678"
  },
  cities: [
    { index: 1, name: "台北市" },
    { index: 2, name: "新北市" },
    { index: 3, name: "桃園市" },
    { index: 4, name: "新竹市" },
    { index: 5, name: "苗栗縣" },
    { index: 6, name: "台中市" },
    { index: 7, name: "彰化縣" },
    { index: 8, name: "南投縣" },
    { index: 9, name: "雲林縣" },
    { index: 10, name: "嘉義縣" },
    { index: 11, name: "台南市" },
    { index: 12, name: "高雄市" },
    { index: 13, name: "屏東縣" },
    { index: 14, name: "台東縣" },
    { index: 15, name: "花蓮縣" },
    { index: 16, name: "宜蘭縣" },
    { index: 17, name: "澎湖縣" },
    { index: 18, name: "金門縣" },
    { index: 19, name: "連江縣" }
  ]
}

db.once('open', async () => {
  const hash = await bcrypt.hash(seedData.users.password, 10)
  const user = await User.create({
    account: seedData.users.account,
    password: hash
  })
  const cities = await Promise.all(seedData.cities.map(city => {
    return City.create({
      name: city.name,
      index: city.index
    })
  }))

  await Promise.all(Array.from({ length: 20 }, (_, i) => Drink.create({
    name: `drink-no.${i}`,
    createdBy: user._id,
    image: `https://loremflickr.com/540/720/drink/?random=${Math.floor(Math.random() * 100)}`
  })))

  await Promise.all(Array.from({ length: 10 }, (_, i) => Store.create({
    name: `store-no.${i}`,
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    cityId: cities[Math.floor(Math.random() * 19 + 1)]._id,
    createdBy: user._id
  })))

  console.log('seeder created ')
  process.exit()
})