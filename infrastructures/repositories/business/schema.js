'use strict'
module.exports = (require('mongoose')).Schema({
  name: { type: String,required: true },
  address: { type: String,required: true },
  sector: { type: String, required: true },
  description: { type: String, required: true },
  equipment_required: { type: String },
  user: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    net_monthly_income: { type: Number, required: true }
  }
})
