'use strict'
module.exports = (
  {mysql, userRepository, businessRepository, loanRepository}
) => {
  let offset = 2
  // let lastPulledOffset = 1851
  function startDataMigration() {
    mysql.query(`select * from leases where id >= ${offset}`)
      .on('result', async (row) => {
        mysql.pause()
        try {
          let user = getUserFrom(row)
          let savedUser = await findOrCreateUser(user)
          let biz = getBusinessFrom(row)
          let loan = getLoanFrom(row)
          biz.user = savedUser
          loan.user = savedUser
          let bizloan = await Promise.all(
            [findOrcreateBusiness(biz), findOrCreateLoan(loan)]
          )
          console.log(row.id)
          offset = row.id
          mysql.resume()
        } catch (e) {
          throw e
        }
      })
      .on('error', (err) => {
        console.log('error ocurred at offset ' + offset)
        startDataMigration()
      })
  }

  function getUserFrom(obj) {
    return {
      firstname: obj.first_name,
      lastname: obj.last_name,
      phone: obj.phone,
      email: obj.email,
      dob: obj.dob,
      net_monthly_income: obj.net_monthly_income
    }
  }

  function getBusinessFrom(obj) {
    return {
      name: obj.business_name,
      address: obj.business_address,
      sector: obj.business_sector,
      description: obj.business_description,
      equipment_required: obj.equipment_required
    }
  }

  function getLoanFrom(obj) {
    return {
      purpose: obj.purpose,
      tenure: obj.tenure,
      amount: obj.requested_amount,
      request_type: obj.request_type,
      repayment_method: obj.repayment_method,
      first_repayment_date: obj.first_repayment_date,
      tm_repayment: obj.tm_repayment
    }
  }

  async function findOrCreateUser(user) {
    const doc = await userRepository.findOne({
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone
    })
    if (doc) return Promise.resolve(doc)
    return userRepository.create(user)

  }

  async function findOrcreateBusiness(biz) {
    const doc = await businessRepository.findOne({
      name: biz.name,
      address: biz.address,
      sector: biz.sector
    })
    if (doc) return Promise.resolve(doc)
    return businessRepository.create(biz)
  }

  async function findOrCreateLoan(loan) {
    const doc = await loanRepository.findOne({
      tenure: loan.tenure,
      amount: loan.amount,
      purpose: loan.purpose,
      request_type: loan.request_type,
      first_repayment_date: loan.first_repayment_date,
      repayment_method: loan.repayment_method
    })
    if (doc) {
      console.log('loan request saved before')
      return Promise.resolve(doc)
    }
    return loanRepository.create(loan)
  }

  return {
    startDataMigration
  }
}