var locomotive = require('locomotive');
var passport = require('passport');
var Controller = locomotive.Controller;

var Account = require('../models/account');

var AccountController = new Controller();

AccountController.show = function() {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ action: 'login' }));

  this.user = this.req.user;
  this.render();
};

AccountController.new = function() {
  this.render();
};

AccountController.loginForm = function() {
  this.render();
};

AccountController.create = function() {
  var account = new Account();

  account.email = this.param('email');
  account.password = this.param('password');
  account.name.first = this.param('name.first');
  account.name.last = this.param('name.last');

  var self = this;
  account.save(function (err) {
    if (err)
      return self.redirect(self.urlFor({ action: 'new' }));

    return self.redirect(self.urlFor({ action: 'login' }));
  });
};

AccountController.login = function() {
  passport.authenticate('local', {
    successRedirect: this.urlFor({ action: 'show' }),
    failureRedirect: this.urlFor({ action: 'login' }) }
  )(this.__req, this.__res, this.__next);
};

AccountController.logout = function() {
  this.req.logout();
  this.redirect('/');
};

module.exports = AccountController;
