var Firebase = require("firebase");
var Geohash = require('ngeohash');
var Helpers = require("../helpers.js");

exports.createSpot = function post(request, reply) {
  var rootRef = new Firebase('https://flickering-fire-9120.firebaseio.com/');
  var openSpotsRef = rootRef.child("spots/open");

  var randLat = Helpers.getRandomNumber(-90, 90);
  var randLong = Helpers.getRandomNumber(-180, 180);

  var randLocation = Geohash.encode(randLat, randLong);

  var spotRef = openSpotsRef.child(randLocation);
  spotRef.update({
    latitude: randLat,
    longitude: randLong,
    lastModified: new Date().toUTCString(),
    quality: 'fresh'
  });

  Helpers.sendResponse(openSpotsRef, reply);
}