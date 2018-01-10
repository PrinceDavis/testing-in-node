'use strict'
require('./test')
const sinon = require('sinon')
const EventEmitter = require('events')
const expect = require('chai').expect

const container = require('./container')
const dataMigrator = require('./sql-to-mongo')

const userRepository = container.resolve('userRepository')
const businessRepository = container.resolve('businessRepository')
const loanRepository = container.resolve('loanRepository')

class Sql extends EventEmitter {
}
const sqlEvent = new Sql()
const mysql = {
  query(sql) {
    return sqlEvent
  },
  pause() {
    console.log('pause called')
  },
  resume() {
    console.log('resume called')
  }
}

const migrator = dataMigrator(
  {mysql, userRepository, businessRepository, loanRepository}
)
var sandbox = sinon.createSandbox()

describe('Data migrator', () => {
  describe('StartDataMigration', () => {
   
    test('it is a function', () => {
      expect(migrator.startDataMigration).to.be.a('function')
    })

    test('it calls query on mysql', () => {
      const query = sandbox.spy(mysql, 'query')
      migrator.startDataMigration()
      expect(query).to.have.been.calledOnce
    })

    test('it calls sqlEvent.on', () => {
      const on = sandbox.spy(sqlEvent, 'on')
      migrator.startDataMigration()
      expect(on).to.have.been.calledTwice
    })

    test('it calls sql.pause', () => {
      const applicant = {
        business_address: '21, Awofeso street, off Shipeolu',
        business_description: 'Rincott Ideas, is a design icon in t.',
        business_name: 'Rincott Ideas',
        business_sector: 'Graphic design/Printing',
        created_at: '2017-09-11 14:35:43',
        dob: '1992-03-17',
        email: 'rincott@yahoo.com',
        equipment_required: null,
        first_name: 'Olutola',
        first_repayment_date: '2017-11-05',
        last_name: 'Odunorin',
        net_monthly_income: '40000.00',
        phone: '08169036341',
        purpose: 'Get a direct imaging printing machine and a pro laptop',
        repayment_method: 'monthly',
        request_type: 'loan',
        requested_amount: '350000',
        tenure: '18',
        tm_repayment: '0.00'
      }
      migrator.startDataMigration()
      sqlEvent.emit('result', applicant)

      const pause = sinon.spy(mysql, 'pause')
      expect(pause).to.have.been.calledOnce
    })
  })
})
