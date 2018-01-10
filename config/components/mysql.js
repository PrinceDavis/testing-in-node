'use strict'
const joi = require('joi')
const schema = joi.object().keys({
  MYSQL_HOST: joi.string().required(),
  MYSQL_USER: joi.string().required(),
  MYSQL_PASSWORD: joi.string().required(),
  MYSQL_DATABASE: joi.string().required()
}).unknown().required()

const { error: err, value }  = joi.validate(process.env, schema)
if (err) throw new Error(`Config, validation error: ${err.message}`)

module.exports = {
  mysql: {
    host: value.MYSQL_HOST,
    user: value.MYSQL_USER,
    password: value.MYSQL_PASSWORD,
    database: value.MYSQL_DATABASE
  }
}