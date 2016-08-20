Meteor.publish('AllActiveRides', function(){
	var cursor = Rides.find({active: true});
    var now = new Date();
    cursor.forEach(function(doc){
        console.log(now);
        if(doc.activeTo < now){
            Rides.update(doc._id, {$set: {active: false}});
        }
    });
    return cursor;

    //no need to find again, cursor is dynamincally linked to db
    //return Rides.find({active: true});


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