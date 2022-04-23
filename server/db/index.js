const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPW,
  port: process.env.PGPORT,
})


module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log(`executed query with params ${params}`, { text, duration, rows: res.rowCount })
      callback(err, res)
    })
  },
}