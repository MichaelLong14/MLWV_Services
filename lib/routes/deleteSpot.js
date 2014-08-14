var Firebase = require("firebase");
var Helpers = require("../helpers.js");

exports.deleteSpot = function del(request, reply) {
	var rootRef = new Firebase('https://flickering-fire-9120.firebaseio.com/');
	var openSpotsRef = rootRef.child("spots/open");

	if (request.params.id) {
		var spotToRemove = openSpotsRef.child(request.params.id);
		spotToRemove.remove(function (error) {
			if (error) {
				reply("Removal Error").code(404);
			}
			else {
				Helpers.sendResponse(openSpotsRef, reply);
			}
		});
	} else {
		openSpotsRef.set({});

		Helpers.sendResponse(openSpotsRef, reply);
	}
}