Template.RidesList.onCreated(function(){
    var self = this;
    self.autorun(function() {
        self.subscribe(Template.currentData().category);
    });
});

Template.RidesList.helpers({
    rides: ()=> {
        return Rides.find({});
    }
});