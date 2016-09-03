Template.Ride.onCreated(function(){
    var self = this;
    this.editMode = new ReactiveVar(false);
    this.confirmDelete = new ReactiveVar(false);

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
    topColor: function() {
        if(this.provide){
            return "#3c763d";  //$mycolor-darkgreen
        }else{
            return  "#A94442"; //$mycolor-darkred  
        }
    }
});

Template.Ride.events({

    'click .toggle-activate': function(){
        Meteor.call('toggleActivate', this._id);
    },
    'click .fa-trash': function (events, instance) {

        instance.confirmDelete.set(false);
        


        Meteor.call('deleteRide', this._id, function(error, result){
            if(error){
                Bert.alert( 'Input Error! Cannot Delete.', 'danger', 'fixed-top', 'fa-frown-o' );
                return false;
            }

            if(result === -1){
                Bert.alert( 'The Item Belongs To Others! Cannot Delete.', 'danger', 'fixed-top', 'fa-frown-o' );

            }

            else{
                Bert.alert( 'Successfully Deleted One Ride.', 'success', 'fixed-top', 'fa-smile-o' );
            }
        });
    },
    'click .fa-pencil': function (event, instance) {
        instance.editMode.set(!instance.editMode.get());
    }

});