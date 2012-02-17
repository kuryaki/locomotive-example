var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;

var bcrypt = require('bcrypt');

var AccountSchema = new Schema({
  // eMail address
  email: { type: Email, unique: true },

  // Password
  salt: { type: String, required: true },
  hash: { type: String, required: true },

  // Name
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  }
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

AccountSchema.static('authenticate', function (email, password, callback) {
  this.findOne({ email: email }, function(err, user) {
    if (err)
      return callback(err);

    if (!user)
      return callback(null, false);

    user.checkPassword(password, function(err, passwordCorrect) {
      if (err)
        return callback(err);

      if (!passwordCorrect)
        return callback(null, false);

      return callback(null, user);
    });
  });
});

module.exports = mongoose.model('Account', AccountSchema);