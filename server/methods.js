Meteor.methods({
    toggleActiveState: function(id, currentState){
        Rides.update(id, {
            $set: {
                active: !currentState
            }
        });
    },
    deleteRide: function(id){
        Rides.remove(id);
    },
    insertRide: function(doc){
        if(Meteor.userId()){
            RidesSchema.clean(doc);//remove "" properties, run autovalue()

            var rideContext = RidesSchema.namedContext("rideForm");

            if(rideContext.validate(doc)){
                Rides.insert(doc);//don't need validate in fact, insert will do validate and throws error which displays on server and catch by client
                return true;
            }
        }
        return false;

    },
    



});

