Template.Ride.onCreated(function(){
    var self = this;
    this.editMode = new ReactiveVar(false);

    self.autorun(function() {
        self.subscribe('UserInfo', Template.currentData().creator);
    });
});


Template.Ride.helpers({
    user: function(){
        // console.log(this);
        return Users.findOne({_id: this.creator});
    },
    date: function(trip){
        return this[trip].date.toDateString();
    },
    editMode: function(){
        return Template.instance().editMode.get();
    },
    updateRideId: function() {
        return this._id;
    },
});

Template.Ride.events({

    'click .toggle-activate': function(){
        Meteor.call('toggleActivate', this._id);
    },
    'click .fa-trash': function () {
        Meteor.call('deleteRide', this._id);
    },
    'click .fa-pencil': function (event, instance) {
        instance.editMode.set(!instance.editMode.get());
    }

})