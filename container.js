'use strict'
const { createContainer, asClass, asFunction, asValue } = require('awilix')
const {
  userRepository,
  businessRepository,
  loanRepository
} = require('./infrastructures/repositories')
const config = require('./config')
const { mongodb, mysql } = require('./infrastructures/databases')
const dataMigrator = require('./sql-to-mongo')

const container = createContainer()
container.register({
  config: asValue(config),
  mongodb: asFunction(mongodb).singleton(),
  mysql: asFunction(mysql).singleton(),
  dataMigrator: asFunction(dataMigrator).singleton(),
  userRepository: asValue(userRepository),
  businessRepository: asValue(businessRepository),
  loanRepository: asValue(loanRepository)
})

module.exports = container
