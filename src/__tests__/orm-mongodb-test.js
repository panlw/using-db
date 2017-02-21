/* eslint-env node,testing */
/* eslint no-magic-numbers:0 */

import test from 'ava'
import orm from '../orm-mongodb'

test('[PASS] auth', t => {
  return orm.auth('c1')
    .then((user) => {
      t.is(user._id, 'c1')
    })
})

test('[PASS] create/remove users', t => {
  const users = [
    {_id: 'neo.pan', name: 'Neo Pan', type: 'A'},
    {_id: 'simon.hu', name: 'Simon Hu', type: 'C'}
  ]
  const userIds = users.map((user) => user._id);
  return orm.removeUsers(userIds) // set-up
    .then((res) => orm.createUsers(users))
    .then((users) => {
      console.log('[DB] description of users:', users.map((user) => user.desc()))
      return orm.removeUsers(userIds)
    }) // tear-down
    .then((res) => {
      console.log('[DB] ', res.result)
      t.is(res.result.n, users.length)
    })
})

test('[FAIL] create user fail if required property is not assigned', t => {
  const users = [
    {_id: 'foo.bar', name: 'Foo Bar'}
  ]
  return orm.createUsers(users)
    .catch((err) => t.is(err.toString(), 'ValidationError: 属性 type 是必须的。'))
})

test('[PASS] contacts', t => {
  return orm.contacts()
    .then((contacts) => {
      t.true(contacts.length > 0)
    })
})
