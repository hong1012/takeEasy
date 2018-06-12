module.exports = function(app){	
	var mock = require('../utils/mock');
	app.use('/mock',mock);
};