var Test = require("./routes/testRoute");

/*
*	Simple handlers aimed at modularizing the routes so they are easy to change.
*/

exports.defaultHandler = function defaultHandler (request, reply) {
	Test.func(request, reply);
};