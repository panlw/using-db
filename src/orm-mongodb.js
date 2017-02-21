import mongoose from 'mongoose'
import Promise from 'bluebird'
mongoose.Promise = Promise

// https://github.com/Automattic/mongoose/blob/master/lib/error/messages.js
mongoose.Error.messages.general.required = '属性 {PATH} 是必须的。'

// create connection
mongoose.connect('mongodb://localhost/rep', {user: 'rep', pass: 'Rep.1234'})

const Schema = mongoose.Schema

const USER_TYPES = {
  'A': '管理员',
  'S': '客服',
  'C': '顾客'
}

let userSchema = new Schema({
  // 用户ID
  _id: {
    type: String,
    required: true
  },
  // 用户类型
  type: {
    type: String,
    required: true,
    enum: Object.getOwnPropertyNames(USER_TYPES)
  },
  // 用户名
  name: {
    type: String,
    required: true
  },
  // 头像(base64)
  avator: String
})
userSchema.virtual('typeName').get(function () {
  return USER_TYPES[this.type]
})
userSchema.methods.desc = function () {
  return `[${this.typeName}] ${this.name} (${this._id})`
}
userSchema.statics.toDesc = function (users) {
  return users.map(user => user.desc())
}
const User = mongoose.model('User', userSchema)

/**
 * Authentication.
 * @param  {String} uid       User ID
 * @return {Promise}          User profile if resolved
 */
const auth = (uid /*, ticket*/ ) => {
  return User
    .findById(uid)
    .then((user) => {
      //TODO authehticated with ticket by auth-server
      if (!user) throw new Error('Authentication Error')
      return user
    })
}

/**
 * Get all contacts.
 * @return {Promise}
 */
const contacts = () => {
  return User
    .find()
    .select('type name avator')
}

const createUsers = (users) => {
  return User.create(users)
}

const removeUsers = (ids) => {
  return User.remove({ _id: { $in: ids } }).exec()
}

export default {
  User,
  auth,
  contacts,
  createUsers,
  removeUsers
}
