import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  port: 3306,
  database: 'rep',
  user: 'rep',
  password: 'Rep.1234'
})

export default pool
