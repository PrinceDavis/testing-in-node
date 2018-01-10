'use strict'

require('dotenv').config()
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const container = require('../container')

container.resolve('config')
container.resolve('mongodb')
const sandbox = sinon.createSandbox()

chai.use(sinonChai)


afterEach(function afterEach () {
  sandbox.restore()
})
