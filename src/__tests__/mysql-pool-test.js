/* eslint-env node,testing */
/* eslint no-magic-numbers:0 */

import test from 'ava'
import pool from '../mysql-pool'

test('[PASS] query', t => {
  const sql = `select ID id, USER_NAME name, USER_ROLE role
    from ?? where ?? = ? limit ?`
  console.log('[DB]', sql)

  const params = ['S_USERS', 'USER_ROLE', 'RES', 3]
  console.log('[DB] Params:', params)

  return pool.query(sql, params)
    .then((res) => {
      let [rows, fields] = res
      //console.log('[DB]', rows, fields)
      t.is(rows.length, 3)
    })
})
