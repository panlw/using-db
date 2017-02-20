import mongoose from 'mongoose'
import Promise from 'bluebird'

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/rep', {user: 'rep', pass: 'Rep.1234'})

const Schema = mongoose.Schema

const UserSchema = new Schema({
  /**
   * 用户ID
   */
  _id: {
    type: String,
    required: true
  },
  /**
   * 用户类型：A=管理员 S=客服 C=顾客
   */
  type: {
    type: String,
    required: true
  },
  /**
   * 用户名
   */
  name: {
    type: String,
    required: true
  },
  /**
   * 头像(base64)
   */
  avator: String
})

const User = mongoose.model('User', UserSchema)

/**
 * Authentication.
 * @param  {String} uid       User ID
 * @return {Promise}          User profile if resolved
 */
const auth = (uid /*, ticket*/ ) => {
  return User
    .findById(uid)
    .exec().then(function(profile) {
      //TODO authehticated with ticket by auth-server
      if (!profile) {
        throw new Error('Authentication Error');
      }
      return profile.toObject();
    });
}

/**
 * Get all contacts.
 * @return {Promise}
 */
const contacts = () => {
  return User
    .find()
    .select('type name avator')
    .exec()
    .then(function(rows) {
      return rows.map(function(row) {
        return row.toObject();
      });
    });
}

export default {
  auth,
  contacts
}
