'use strict'
const mongoose = require('mongoose')

module.exports = ({config}) => {
  mongoose.connect(config.mongodb.uri)
    .then(db => console.log('Connected to mongodb'))
    .catch(err => {
      throw new Error(`Connection to mongodb failed: ${err.message}`)
    })
}
