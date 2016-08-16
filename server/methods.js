Meteor.methods({
    toggleActiveState: function(id, currentState){
        Rides.update(id, {
            $set: {
                effective: !currentState
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
            console.log(doc);

            if(rideContext.validate(doc)){
                Rides.insert(doc);
                return true;
            }
        }
        return false;

    }



});

