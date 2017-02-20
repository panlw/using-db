/* eslint-env node,testing */
/* eslint no-magic-numbers:0 */

import test from 'ava'
import orm from '../orm-mongodb'

test('auth', t => {
  return orm.auth('c1')
    .then((profile) => {
      console.log('[DB]', profile)
      t.pass()
    })
    .catch((err) => {
      console.err('[DB]', profile)
    })
})
