Template.RidesList.onCreated(function(){
    var self = this;
    self.autorun(function() {
        // console.log(Template.currentData().category);
        self.subscribe(Template.currentData().category);
    });
});

Template.RidesList.helpers({
    rides: function(){
        if(this.category==="MyRides"){
            return Rides.find({}, { sort: { createdAt: -1 } });
        }else{
            return Rides.find({}, { sort: { activeTo: 1 } });
        }
        
    }
});