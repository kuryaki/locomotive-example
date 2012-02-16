var locomotive = require('locomotive');
var passport = require('passport');
var Controller = locomotive.Controller;

var AccountController = new Controller();

AccountController.show = function() {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ action: 'login' }));

  this.user = this.req.user;
  this.render();
};

AccountController.loginForm = function() {
  this.render();
};

AccountController.login = function() {
  var homePath = this.urlFor({ action: 'show' });
  var loginPath = this.urlFor({ action: 'login' });

  passport.authenticate('local', {
    successRedirect: homePath,
    failureRedirect: loginPath }
  )(this.__req, this.__res, this.__next);
};

AccountController.logout = function() {
  this.req.logout();
  this.res.redirect('/');
};

module.exports = AccountController;
