'use strict'
module.exports = new (require('mongoose')).Schema({
  tenure: { type: String, required: true },
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  request_type: { type: String, required: true },
  first_repayment_date: { type: Date },
  repayment_method: { type: String, required: true },
  tm_repayment: { type: Number},
  user: {
    firstname: { type: String, required: true },
    lastname: { type: String,required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    net_monthly_income: { type: Number, required: true }
  }
})
