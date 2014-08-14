var Firebase = require("firebase");
var Helpers = require("../helpers.js");

exports.getOpenSpots = function get(request, reply) {
  var rootRef = new Firebase('https://flickering-fire-9120.firebaseio.com/');
  var openSpotsRef = rootRef.child("spots/open");

  Helpers.sendResponse(openSpotsRef, reply);
}