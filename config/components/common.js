'use strict'
const joi = require('joi')
const schema = joi.object().keys({
  NODE_ENV: joi.string()
    .allow(['development', 'production', 'test', 'staging']).required(),
  PROCESS_TYPE: joi.string().required(),
}).unknown().required()

const { error: err, value } = joi.validate(process.env, schema)
if (err) throw new Error(`Config, validation error: ${err.message}`)

module.exports = {
  env: value.NODE_ENV,
  process: {
    type: value.PROCESS_TYPE
  }
}
