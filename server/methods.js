Meteor.methods({
    toggleActivate: function(id, currentState){
        check(id, String);
        check(currentState,Boolean);
    
        doc = Rides.findOne({_id: id});
        var now = new Date();
    
        


        if(doc && doc.creator === this.userId){
            if (doc.activeTo < now) {
                return -2;
            }
            Rides.update(id, { $set: {
                active: !currentState,
                activeTo: doc.activeTo
            }});
            return 0;
        }else{
            return -1;
        }
    },
    deleteRide: function(id){
        check(id, String);
        doc = Rides.findOne({_id: id});
        if(doc && doc.creator === this.userId){
            Rides.remove(id);
            return 0;
        }else{
            return -1;
        }
    },
    insertRide: function(doc, id){
        if(Meteor.userId()){
            
            if(id){
                Rides.update(id, {$set: doc}); //no 'active' and 'createdAt', they will be autovalued. 
            }else{
                //RidesSchema.clean(doc);//remove "" properties, run autovalue()
                Rides.insert(doc);//don't need validate and clean in fact, insert will do validate and throws error which displays on server and catch by client
            }

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
    
    toggleBookmark: function(userId, rideId, currentState){

        if(currentState){
            Users.update(userId, {$pull: {bookmarkList: rideId }});
        }else{
            Users.update({_id: userId}, { $addToSet: {bookmarkList: rideId } });
            //$addToSet: create an array field if not exist; add value to the array if the value not exist;
        }

        
        //PS: expired ride won't appear, so not check expiration of rideId here.
    }   


});

