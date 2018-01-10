'use strict'
const processType = process.env.PROCESS_TYPE
const common = require('./components/common')
const mongodb = require('./components/mongodb')
const mysql = require('./components/mysql')

module.exports = {...common, ...mongodb, ...mysql}
