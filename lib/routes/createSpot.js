var Firebase = require("firebase");
var Geohash = require('ngeohash');
var Helpers = require("../helpers.js");

exports.createSpot = function post(request, reply) {
	var rootRef = new Firebase('https://flickering-fire-9120.firebaseio.com/');
	var openSpotsRef = rootRef.child("spots/open");

	var lat = request.payload.lat != null ? request.payload.lat : Helpers.getRandomNumber(30, 45);
	var lng = request.payload.lng != null ? request.payload.lng : Helpers.getRandomNumber(-120, -75);

	lat = parseFloat(lat.toFixed(4));
	lng = parseFloat(lng.toFixed(4));

	var geoHash = Geohash.encode(lat, lng);

	var spotRef = openSpotsRef.child(geoHash);
	spotRef.update({
		lat: lat,
		lng: lng,
		lastModified: new Date().toUTCString(),
		quality: 'fresh'
	});

	Helpers.sendResponse(openSpotsRef, reply);
}