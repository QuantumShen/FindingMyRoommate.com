Template.Rides.onCreated(function(){
   Session.set('listCategory', 'AllActiveRides');
});


Template.Rides.events({
    'click .provide-new-ride-js': () => {
        Session.set('newRide', true);
        Session.set('provideRide', true);
    },

    'click .looking-for-new-ride-js': () => {
        Session.set('newRide', true);
        Session.set('provideRide', false);
    },

    'click .tab-lists>li>a': function(event, instance){
        event.preventDefault();
        var dom = event.target; //pure javascript dom, not jquery

        while(dom.getAttribute('role')!=="presentation"){
            dom = dom.parentNode;
        }

        //set active to non-active
        var active=document.querySelector("ul.tab-lists > li.active");
        active.className = "";

        //add active to target's parent <li>
        dom.className = "active";

        //read target value, 
        Session.set('listCategory', dom.id);

        //subscribe correponsing publish in RidesList based on 'listCategory'

    },


});


Template.Rides.helpers({
    'listCategory': ()=>{
        return Session.get('listCategory');
    }
});