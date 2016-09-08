Meteor.publish('UserInfo', function(id){
    // console.log(id);
    return Users.find({_id: id},{
        fields:{
            username: 1,
            emails: 1
        }
    });
});

Meteor.publish('UserRideBookmark', function(userId){
    var doc = Users.findOne(userId, {
        fields:{
            bookmarkList: 1,
        }
    });
    //for..in.. returns each key in hashset/object/array
    //for(var rideId in doc.bookmarkList){
    // console.log(userId, doc.bookmarkList);
    if(doc && doc.bookmarkList){
        doc.bookmarkList.forEach(function(rideId){
            //test whether each ride still exists
            var ride = Rides.findOne({_id: rideId});

            if(!ride){
                Users.update(userId, {$pull: {bookmarkList: rideId }});
            }

        });
    }    
    return Users.find(userId, {
        fields:{
            bookmarkList: 1,
        }
    });
});