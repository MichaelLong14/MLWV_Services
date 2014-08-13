var Test = require("./routes/testRoute");
var Login = require("./routes/login");

/*
*	Simple handlers aimed at modularizing the routes so they are easy to change.
*/

exports.defaultHandler = function defaultHandler (request, reply) {
	Test.func(request, reply);
};

exports.loginHandler = function loginHandler (request, reply) {
	Login.login(request, reply);
};