'use strict'
const mysql = require('mysql')
const util = require('util')

module.exports = ({config}) => {
  const pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
  })
  let initialized = false
  let connection = null

  pool.getConnection((err, conn) => {
    if (err) throw new error(`Connection to mysql failed: ${err.message}`)
    initialized = true,
    connection = conn
    console.log('Connected to mysql')
  })

  const query = sql => {
    if (!initialized) throw new error('Connection to mysql not found')
    return connection.query(sql)
  }

  const pause = () => connection.pause()
  const resume = () => connection.resume()

  return { query, pause, resume}
}
