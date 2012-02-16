var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/skylines');

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);