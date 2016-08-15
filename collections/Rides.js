Rides = new Mongo.Collection('rides');

Rides.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

// Trip = new SimpleSchema({
// 	from: {
// 		type: String,
// 		label: "From" 
// 	},
// 	desti: {
// 		type: String,
// 		label: "Destination"
// 	},
// 	departAt: {
// 		type: Date,
// 		label: "Departure Time"
// 	}
// });

// Talk = new SimpleSchema({
// 	replyTo: {
// 		type: String,   //will be the userId to reply to 
// 		label: "ReplyTo"  
// 	},
// 	text: {
// 		type: String,
// 		label: "Talking Text"
// 	},
// 	createdAt:{
// 		type: Date,
// 		label: "Created At",
// 		autoValue: function() {
// 			return new Date();
// 		},
// 	}

// });


// RidesSchema = new SimpleSchema({
// 	trips: {
// 		type: [Trip]  //Trip array
// 	},
// 	// talks: {
// 	// 	type: [Talk],
// 	// 	autoform: {
// 	// 		type: "hidden"
// 	// 	}
// 	// },
// 	active: {
// 		type: Boolean,
// 		defaultValue: true
// 	},
// 	organiser: {
// 		type: String,
// 		label: "Organiser",
// 		autoValue: function () {
// 			return this.userId;
// 		},
// 		autoform: {
// 			type: "hidden"
// 		}
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At",
// 		autoValue: function() {
// 			return new Date();
// 		},
// 		autoform: {
// 			type: "hidden"
// 		}
// 	},
// 	likes: {
// 		type: Number,
// 		label: "Count of likes",
// 		autoValue: ()=>0,
// 		autoform: {
// 			type: "hidden"
// 		}
// 	}
// });

// Meteor.methods({
// 	toggleActiveState: function(id, currentState){
// 		Rides.update(id, {
// 			$set: {
// 				active: !currentState
// 			}
// 		});
// 	},
// 	deleteRide: function(id){
// 		Rides.remove(id);
// 	}
// });

// Rides.attachSchema(RidesSchema);
