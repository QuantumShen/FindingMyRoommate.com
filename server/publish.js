Meteor.publish('AllActiveRides', function(){
	return Rides.find({active: true});
});

Meteor.publish('MyRides', function(){
	return Rides.find({creater: this.userId});
});

Meteor.publish('UserInfo', function(id){
    // console.log(id);
    return Users.find({_id: id},{
        fields:{
            username: 1,
            emails: 1
        }
    });
});

//_id: id