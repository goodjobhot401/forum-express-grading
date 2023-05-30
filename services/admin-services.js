const { imgurFileHandler } = require('../helper/file-helpers')
const { Restaurant, Category } = require('../models')

const adminServices = {
  getRestaurants: (req, cb) => {
    return Restaurant.findAll({ raw: true, nest: true, include: [Category] })
      .then(restaurants => {
        return cb(null, { restaurants })
      })
      .catch(err => cb(err))
  },

  postRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body

    if (!name) throw new Error('Restaurant name is required!')

    const { file } = req // 把檔案從 req 拿出來
    imgurFileHandler(file) // 將取出的檔案交給 file-helpers.js 處理
      .then(filePath => Restaurant.create({ // 再 create 這筆資料
        name,
        tel,
        address,
        openingHours,
        description,
        categoryId,
        image: filePath || null
      }))
      .then(newRestaurant => cb(null, { restaurant: newRestaurant }))
      .catch(err => cb(err))
  },

  deleteRestaurant: (req, cb) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        return restaurant.destroy()
      })
      .then(deletedRestaurant => cb(null, { restaurant: deletedRestaurant }))
      .catch(err => cb(err))
  }
}

module.exports = adminServices
