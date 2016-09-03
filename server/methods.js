Meteor.methods({
    toggleActiveState: function(id, currentState){
        Rides.update(id, {
            $set: {
                active: !currentState
            }
        });
    },
    deleteRide: function(id){
        check(id, String);
        doc = Rides.findOne({_id: id});
        //console.log(this);
        if(doc && doc.creator === this.userId){
            Rides.remove(id);
            return 0;
        }else{
            return -1;
        }
    },
    insertRide: function(doc){
        if(Meteor.userId()){

            console.log(doc);
            RidesSchema.clean(doc);//remove "" properties, run autovalue()
            
            Rides.insert(doc);//don't need validate in fact, insert will do validate and throws error which displays on server and catch by client
            return true;

            //PITFALL: creator auto added in insert only. So just after clean, validate can not pass
            // var rideContext = RidesSchema.namedContext("rideForm");
            // if(rideContext.validate(doc)){
            //     Rides.insert(doc);//don't need validate in fact, insert will do validate and throws error which displays on server and catch by client
            //     return true;
            // }
        }
        return false;

    },
    



});

