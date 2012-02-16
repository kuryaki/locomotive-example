module.exports = function routes() {
  this.root('pages#main');
  this.resource('account');
  this.match('login', 'account#loginForm', { via: 'get' });
  this.match('login', 'account#login', { via: 'post' });
  this.match('logout', 'account#logout');
};
