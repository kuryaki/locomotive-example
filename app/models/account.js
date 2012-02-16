var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var AccountSchema = new Schema({
  // eMail address
  email: { type: String, unique: true },

  // Password
  salt: String,
  hash: String
});

AccountSchema.virtual('password').get(function () {
  return this._password;
}).set(function (password) {
  this._password = password;
  var salt = this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
});

AccountSchema.method('checkPassword', function (password, callback) {
  bcrypt.compare(password, this.hash, callback);
});

module.exports = mongoose.model('Account', AccountSchema);