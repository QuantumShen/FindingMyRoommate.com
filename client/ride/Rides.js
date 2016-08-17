Template.Rides.onCreated(function(){
   Session.set('listCategory', 'AllActiveRides');
});




Template.Rides.events({
    'click .new-ride-js': () => {
        Session.set('newRide', true);
    }
});


Template.Rides.helpers({
    'listCategory': ()=>{
        return Session.get('listCategory');
    }
});