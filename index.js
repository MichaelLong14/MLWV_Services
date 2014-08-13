var Hapi = require("hapi");
var Joi = require("joi");
var Handlers = require("./lib/handlers");

var serverOptions = {
  cors: {
    additionalHeaders: ['X-Api-Key', 'Accept', 'Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Api-Key'],
    credentials: true
  }
};

var port = process.env.port || 5000;
var server = new Hapi.Server(port, serverOptions);

var pack = require("package"),
  swaggerOptions = {
    basePath: 'http://localhost:5000',
    apiVersion: pack.version
  };

var routeArray = [{
  method: 'GET',
  path: '/test',
  config: {
    handler: Handlers.defaultHandler,
    description: 'Default Route used for testing',
    notes: 'Default Route',
    tags: ['api']
  }
}]

server.route(routeArray);

server.pack.register({
  plugin: require('hapi-swagger'),
  options: swaggerOptions
}, function(err) {
  if (err) {
    server.log(['error'], 'Plugin "hapi-swagger" load error: ' + err);
  } else {
    server.log(['start'], 'Swagger interface loaded');
    //Don't need to actually start the server to run Lab tests.
    if (!module.parent) {
      server.start(function() {
        console.log(['start'], pack.name + ' - web interface: ' + server.info.uri);
      });
    }
  }
});

module.exports = server;