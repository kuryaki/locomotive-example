var express = require('express');

module.exports = function() {
  this.use(express.errorHandler());
  this.set('db-uri', 'mongodb://piitri:piitri@staff.mongohq.com:10016/piitri');
};
