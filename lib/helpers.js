var _ = require('underscore');

// Helper methods
exports.getRandomNumber = function getRandomNumber(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(4));
}

exports.sendResponse = function sendResponse(data, reply) {
  data.on('value', function(snapshot) {
    var data = [];
    _.each(snapshot.val(), function(value, key, list) {
      value.geoHash = key;
      data.push(value);
    });
    reply(data);
  }, function(errorObject) {
    console.log('The read failed: ' + errorObject.code);
    reply(404);
  });
}