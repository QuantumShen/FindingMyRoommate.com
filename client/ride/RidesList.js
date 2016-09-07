Template.RidesList.onCreated(function(){
    var self = this;
    self.autorun(function() {
        // console.log(Template.currentData().category);
        self.subscribe(Template.currentData().category); //from Rides
        self.subscribe('UserRideBookmark', Meteor.userId()); //from Users


        var cursor = Users.findOne({_id: Meteor.userId()});  //certainly only one user doc is returned
        if(cursor && cursor.bookmarkList){
            Session.set('bookmarkList', cursor.bookmarkList);
        }else{
            Session.set('bookmarkList', []);
        }
    });
});

Template.RidesList.helpers({
    rides: function(){
        if(this.category==="MyRides"){
            return Rides.find({}, { sort: { createdAt: -1 } });
        }else{
            return Rides.find({}, { sort: { activeTo: 1 } });
        }
        
    },

});