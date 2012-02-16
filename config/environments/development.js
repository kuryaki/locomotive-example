var express = require('express');

module.exports = function() {
  this.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
