module.exports = function(){

	this.mongoose = require('mongoose');
	this.mongoose.connect(this.set('db-uri'));
	this.mongooseTypes = require("mongoose-types");
	this.mongooseTypes.loadTypes(this.mongoose);
};

