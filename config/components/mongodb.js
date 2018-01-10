'use strict'
const joi = require('joi')
const schema = joi.object().keys({
  MONGODB_TEST_URI: joi.string().required()
}).unknown().required()

const { error, value } = joi.validate(process.env, schema)
if (error) {
  throw new Error(`Config, validation error: ${error.message}`)
}

module.exports = {
  mongodb: {
    uri: value.MONGODB_TEST_URI
  }
}
