var locomotive = require('locomotive');
var Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Locomotive';
  this.render();
};

module.exports = PagesController;
