Template.Ride.onCreated(function(){
    var self = this;
    this.editMode = new ReactiveVar(false);

    
    this.marked = new ReactiveVar(false);
    var rideId = Template.currentData()._id;


    self.autorun(function() {
        self.subscribe('UserInfo', Template.currentData().creator);
        var bookmarkList = Session.get('bookmarkList');
        if(bookmarkList.indexOf(rideId) >= 0){
            self.marked.set(true);
        }else{
            self.marked.set(false);
        }
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
    },
    marked:function(){
        return Template.instance().marked.get();
    }
});

Template.Ride.events({

    'click .toggle-activate-js': function(){
        var doc = this;
        if(doc.active){
            var title = "Confirm Deactivation";
            var text =  "Other people cannot see it after deactivation. \n You can still reactivate it, \nbut expired ride will be deactivated automatically. ";
            var buttonText = "Yes, deactivate it!";
            var errorText = 'Deactivation failed due to error input.';
            var successText = 'Successfully deactivated one ride.';
        }else{
            title = "Confirm Activation";
            text =  "Other people can see it after activation. \n Note that expired ride cannot be reactivated, \nunless you update the ride date. ";
            buttonText = "Yes, activate it!";
            errorText = 'Activation failed due to error input.';
            successText = 'Successfully activated one ride.';
            expiredText = 'The ride has expired and deactivated automatically.';
        }
        swal({ 
            title: title, 
            text: text,
            type: "warning", 
            showCancelButton: true, 
            confirmButtonColor: "#D9534F", 
            confirmButtonText: buttonText, 
            closeOnConfirm: true 
        }, 
        function() { 
            Meteor.call('toggleActivate', doc._id, doc.active, function(error, result){
                if(error || result==-1){
                    Bert.alert( errorText, 'danger', 'fixed-top', 'fa-frown-o' );
                    return false;
                }else if(result === -2){
                    Bert.alert( expiredText, 'danger', 'fixed-top', 'fa-frown-o' );
                }else{
                    Bert.alert(successText , 'success', 'fixed-top', 'fa-smile-o' );
                }
            });
        });
    },

    'click .toggle-bookmark-js': function(event, instance){
        var userId = Meteor.userId();
        Meteor.call('toggleBookmark', userId, this._id, instance.marked.get());

    },


    'click .fa-trash': function (events, instance) {
        var doc = this;
        swal({ 
            title: "Confirm Delete", 
            text: "You will not be able to recover this ride post after deletion!", 
            type: "warning", 
            showCancelButton: true, 
            confirmButtonColor: "#D9534F", 
            confirmButtonText: "Yes, delete it!", 
            closeOnConfirm: true 
        }, 
        function() { 
            Meteor.call('deleteRide', doc._id, function(error, result){
                if(error || result === -1){
                    Bert.alert( 'Input error! Cannot delete.', 'danger', 'fixed-top', 'fa-frown-o' );
                    return false;
                }else{
                    Bert.alert( 'Successfully deleted one ride.', 'success', 'fixed-top', 'fa-smile-o' );
                }
            });
        });
    },
    'click .fa-pencil': function (event, instance) {
        instance.editMode.set(!instance.editMode.get());
    }

});