Meteor.publish('AllActiveRides', function() {
    //var cursor = Rides.find({ active: true }, { sort: { activeTo: 1 } }); //server side sort is meaningless and costly
    var cursor = Rides.find({ active: true });
    var now = new Date();
    cursor.forEach(function(doc) {
        if (doc.activeTo < now) {
            Rides.update(doc._id, { $set: {
                active: false,
                activeTo: doc.activeTo,
                createdAt: doc.createdAt
            } }); //createdAt exists inside, I don't want it to autovalue() again!
        }
    });
    return cursor;

    //no need to find again, cursor is dynamincally linked to db
    //return Rides.find({active: true});


});

//smartPublish allows for cursor from same collection to combine

// Meteor.smartPublish('MyRides', function() {

//     var active = Rides.find({ creator: this.userId, active: true }, { sort: { activeTo: 1 } });

//     var inactive = Rides.find({ creator: this.userId, active: false }, { sort: { activeTo: -1 } });

//     return [active, inactive];
// });

Meteor.publish('MyRides', function() {
    
    var cursor = Rides.find({ active: true });
    var now = new Date();
    cursor.forEach(function(doc) {
        if (doc.activeTo < now) {
            Rides.update(doc._id, { $set: {
                active: false,
                activeTo: doc.activeTo,
                createdAt: doc.createdAt
            } }); //createdAt exists inside, I don't want it to autovalue() again!
        }
    });

    return Rides.find({creator: this.userId});

});

Meteor.publish('PUCHI', function() {
    var cursor = Rides.find({
        active: true,
        $or: [{ "trip1.category": 1 }, { "trip2.category": 1 }],
    });

    return cursor;
});

Meteor.publish('CHIPU', function() {
    var cursor = Rides.find({
        active: true,
        $or: [{ "trip1.category": 2 }, { "trip2.category": 2 }],
    });

    return cursor;
});

Meteor.publish('OtherRoutes', function() {
    var cursor = Rides.find({
        active: true, 
        $or: [{"trip1.category" : 3},{"trip2.category" : 3}],
    });

    return cursor;
});

Meteor.publish('Star', function() {
    var cursor = Rides.find();
    return cursor;
});