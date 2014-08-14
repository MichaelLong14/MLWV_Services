var Firebase = require("firebase");
var Geohash = require('ngeohash');
var Helpers = require("../helpers.js");

exports.createSpot = function post(request, reply) {
	var rootRef = new Firebase('https://flickering-fire-9120.firebaseio.com/');
	var openSpotsRef = rootRef.child("spots/open");

	var lat = parseFloat(request.payload.lat.toFixed(4));
	var lng = parseFloat(request.payload.lng.toFixed(4));
	var lastModified = request.payload.lastModified;

	var geoHash = Geohash.encode(lat, lng);

	var spotRef = openSpotsRef.child(geoHash);
	spotRef.update({
		lat: lat,
		lng: lng,
		lastModified: lastModified
	});

	Helpers.sendResponse(openSpotsRef, reply);
}