Meteor.publish('AllRides', function(){
	return Rides.find({effective: true});
});

Meteor.publish('MyRides', function(){
	return Rides.find({organizer: this.userId});
});