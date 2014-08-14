// Helper methods
exports.getRandomNumber = function getRandomNumber(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(4));
}

exports.sendResponse = function sendResponse(data, reply) {
  data.on('value', function(snapshot) {
    reply(snapshot.val());
  }, function(errorObject) {
    console.log('The read failed: ' + errorObject.code);
    reply(404);
  });
}