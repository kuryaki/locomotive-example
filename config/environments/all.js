var express = require('express');
var passport = require('passport');

module.exports = function() {
  this.set('views', __dirname + '/../../app/views');
  this.set('view engine', 'jade');

  this.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }));
  this.use(express.cookieParser());
  this.use(express.bodyParser());

  this.use(passport.initialize());
  this.use(passport.session());

  this.use(this.router);
  this.use(express.static(require('path').resolve(__dirname + "/../../public")));

  this.datastore(require('locomotive-mongoose'));
};
