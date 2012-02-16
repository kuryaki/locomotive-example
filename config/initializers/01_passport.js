var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var users = [
  { id: 1, email: 'bob@example.com', password: 'secret' },
  { id: 2, email: 'joe@example.com', password: 'birthday' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByMail(mail, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.email === email) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Use the LocalStrategy within Passport.

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure.  Otherwise, return the authenticated `user`.
    findByMail(email, function(err, user) {
      if (err)
        return done(err);

      if (!user || user.password != password)
        return done(null, false);

      return done(null, user);
    });
  }
));

// Passport session setup.

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});