var Firebase = require("firebase");

exports.func = function func(request, reply) {
	var rootRef = new Firebase('https://flickering-fire-9120.firebaseio.com/');
	var usersRef = rootRef.child("users");

	//There are distinct and important differences between set, push, etc
	//if the user mikel32 existed and had properties, set would overwrite everything, regardless of conflicts.
	//if push is used, the objects are added as a unique new object and w/ a timestamp based id. accessed via var x = ref.push()
	usersRef.set({
			mikel32: {
			date_of_birth: "06/15/1993",
			full_name: "Michael Long"
		},
			testUser: {
			date_of_birth: "07/06/2011",
			full_name: "Test User FullName"
		}
	});

	//Lots of options to replace value. 
	//Queries can be used to only get small amounts of data
	rootRef.on('value', function (snapshot) {
		console.log("snapshot: ");
		console.log(snapshot.val());
	}, function (errorObject) {
		console.log("The read failed: " + errorObject);
	});
	
	reply().code(200);
}