Template.Rides.onCreated(function(){
    var self = this;
    self.autorun(function() {
        self.subscribe('AllRides');
    });
});

Template.Rides.helpers({
    rides: ()=> {
        return Rides.find({});
    }
});

Template.Rides.events({
    'click .new-ride-js': () => {
        Session.set('newRide', true);
    }
});


