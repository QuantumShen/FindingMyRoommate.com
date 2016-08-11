Meteor.publish('AllRides', function(){
	return Rides.find({active: true});
});

Meteor.publish('MyRides', function(){
	return Rides.find({organizer: this.userId});
});