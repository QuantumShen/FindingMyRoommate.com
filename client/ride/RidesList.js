Template.RidesList.onCreated(function(){
    var self = this;
    self.autorun(function() {
        // console.log(Template.currentData().category);
        self.subscribe(Template.currentData().category);
    });
});

Template.RidesList.helpers({
    rides: ()=> {
        return Rides.find({});
    }
});