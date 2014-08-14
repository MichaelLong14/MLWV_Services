var Firebase = require("firebase");
var Helpers = require("../helpers.js");

exports.deleteSpot = function del(request, reply) {

	if (request.params.id) {
		//Delete by ID
	} else {
		var rootRef = new Firebase('https://flickering-fire-9120.firebaseio.com/');
		var openSpotsRef = rootRef.child("spots/open");

		openSpotsRef.set({});

		Helpers.sendResponse(openSpotsRef, reply);
	}
}