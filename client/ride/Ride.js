Template.Ride.onCreated(function(){
    var self = this;
    this.editMode = new ReactiveVar(false);
    this.confirmDelete = new ReactiveVar(false);//I added this for what? don't remember

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
        return $.datepicker.formatDate('M dd, yy D', this[trip].date);
    },
    editMode: function(){
        return Template.instance().editMode.get();
    },
    updateRideId: function() {
        return this._id;
    },
    topColor: function() {
        if(this.offerRide){
            return "#3c763d";  //$mycolor-darkgreen
        }else{
            return  "#F0AD4E"; //$mycolor-darkredorange 
        }
    },
    inMyRides: function(){
        return Session.get('listCategory') === "MyRides";
    },
    createdAt: function(){
        var localDate = new Date(this.createdAt);
        var hh = localDate.getHours();  // typeof hh returns number
        if(hh < 10) hh='0'+hh;
        var mm = localDate.getMinutes();
        if(mm < 10) mm= '0'+mm;
        var ss = localDate.getSeconds();
        if(ss < 10) ss= '0'+ss;

        return $.datepicker.formatDate('yy-mm-dd ', localDate) + hh + ":" +mm + ":" + ss;
    }
});

Template.Ride.events({

    'click .toggle-activate-js': function(){
        Meteor.call('toggleActivate', this._id, this.active);
    },
    'click .fa-trash': function (events, instance) {

        //instance.confirmDelete.set(false); 
        


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