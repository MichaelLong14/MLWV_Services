var OpenSpots = require("./routes/getOpenSpots");
var CreateSpot = require("./routes/createSpot");
var DeleteSpot = require("./routes/deleteSpot");
var CreateSpots = require("./routes/createSpots");

/*
*	Simple handlers aimed at modularizing the routes so they are easy to change.
*/

exports.getOpenSpots = function getOpenSpots (request, reply) {
	OpenSpots.getOpenSpots(request, reply);
};

exports.createOpenSpot = function createOpenSpot (request, reply) {
	CreateSpot.createSpot(request, reply);
};

exports.deleteOpenSpot = function deleteOpenSpot (request, reply) {
	DeleteSpot.deleteSpot(request, reply);
};

exports.createSpots = function createSpots (request, reply) {
	CreateSpots.createSpots(request, reply);
}