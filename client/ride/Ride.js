Template.Ride.onCreated(function(){
    var self = this;

    self.autorun(function() {
        self.subscribe('UserInfo', Template.currentData().creator);
    });
});

Template.Ride.helpers({
    user: function(){
        console.log(this);
        return Users.findOne({_id: this.creator});
    },
    date: function(trip){
        return this[trip].date.toDateString();
    }


});