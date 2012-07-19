module.exports = function routes() {
  this.root('account#new');
  this.resource('account');
  this.match('register', 'account#new', { via: 'get'});
  this.match('login', 'account#loginForm', { via: 'get' });
  this.match('login', 'account#login', { via: 'post' });
  this.match('logout', 'account#logout');
};
