var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../../app/models/account');

// Use the LocalStrategy within Passport.

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure.  Otherwise, return the authenticated `user`.
    Account.findOne({ email: email }, function(err, user) {
      if (err)
        return done(err);

      if (!user)
        return done(null, false);

      user.checkPassword(password, function(err, passwordCorrect) {
        if (err)
          return done(err);

        if (!passwordCorrect)
          return done(null, false);

        return done(null, user);
      })
    });
  }
));

// Passport session setup.

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function (err, user) {
    done(err, user);
  });
});