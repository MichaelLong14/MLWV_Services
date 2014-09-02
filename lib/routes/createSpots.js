var Firebase = require("firebase");
var Geohash = require('ngeohash');
var Helpers = require("../helpers.js");

exports.createSpots = function createSpots(request, reply) {
	var rootRef = new Firebase('https://flickering-fire-9120.firebaseio.com/');
	var openSpotsRef = rootRef.child("spots/open");

	var data = [{
		lat: 37.23029421797958,
		lng: -80.41594684123993
	}, {
		lat: 37.22971760323458,
		lng: -80.41690170764923
	}, {
		lat: 37.23088791299855,
		lng: -80.417400598526
	}, {
		lat: 37.23042662518741,
		lng: -80.41817307472229
	}, {
		lat: 37.23012336962595,
		lng: -80.41867196559906
	}, {
		lat: 37.22988418128052,
		lng: -80.41904211044312
	}, {
		lat: 37.230307031590506,
		lng: -80.41780292987823
	}, {
		lat: 37.23081103189267,
		lng: -80.41696608066559
	}, {
		lat: 37.22867968558176,
		lng: -80.41471302509308
	}, {
		lat: 37.228530190092556,
		lng: -80.4145359992981
	}, {
		lat: 37.22828672537579,
		lng: -80.4142677783966
	}, {
		lat: 37.22796637586663,
		lng: -80.41391909122467
	}, {
		lat: 37.228615616122696,
		lng: -80.41510462760925
	}, {
		lat: 37.22848747704121,
		lng: -80.41514217853546
	}, {
		lat: 37.22843195003828,
		lng: -80.41536748409271
	}, {
		lat: 37.228179942357286,
		lng: -80.41560351848602
	}, {
		lat: 37.22803471720945,
		lng: -80.41594684123993
	}, {
		lat: 37.22821411293965,
		lng: -80.41690707206726
	}, {
		lat: 37.227201802871384,
		lng: -80.41611313819885
	}, {
		lat: 37.227206074250454,
		lng: -80.4157429933548
	}];

	for (var i = 0; i < 4; i++) {
		var index = Helpers.getRandomNumber(0, data.length);
		var obj = data[index];

		var geoHash = Geohash.encode(obj.lat, obj.lng);

		var spotRef = openSpotsRef.child(geoHash);
		spotRef.update({
			lat: obj.lat,
			lng: obj.lng,
			lastModified: new Date().toUTCString(),
		});

	}



	setInterval(function() {
		var select = Math.floor((Math.random() * 2));
		//console.log("Select: " + select);
		if (select === 0) {
			var index = Helpers.getRandomNumber(0, data.length);
			var obj = data[index];

			var geoHash = Geohash.encode(obj.lat, obj.lng);
			
			var spotRef = openSpotsRef.child(geoHash);
			spotRef.update({
				lat: obj.lat,
				lng: obj.lng,
				lastModified: new Date().toUTCString(),
			});
		} else {
			openSpotsRef.once('value', function(snapshot) {
				var x = 0;
				var rand = Math.floor(Math.random() * snapshot.numChildren() + 1);
				//console.log("Rand: " + rand);
				snapshot.forEach(function(snap) {
					if (x === rand) {
						rand = -1;
						var spotRef = snap.ref();
						
						spotRef.remove(function(error) {
							if (error) {
								console.log("removal error");
							} else {
								//success
							}
						});
					}
					x++;
				});
			}, function(errorObject) {
				console.log('The read failed: ' + errorObject.code);
			});
		}
	}, 3000);
}