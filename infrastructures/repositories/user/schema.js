'use strict'
module.exports = new (require('mongoose')).Schema({
  firstname: { type: String, required: true },
  lastname: { type: String,required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  net_monthly_income: { type: Number, required: true }
})