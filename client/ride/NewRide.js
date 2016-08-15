Template.NewRide.onCreated(function() {
  this.roundTrip = new ReactiveVar(true);  //this is the template instance
});

Template.NewRide.events({
    'click .fa-taxi': function(events,template) {
        template.roundTrip.set(false);
    },
    'click .fa-refresh': function(events,template) {
        template.roundTrip.set(true);
    },

    'submit .add-ride-js': function(event, template){
        if(Meteor.user()){
            //let rountTrip = template.roundTrip.get();
            // console.log(event.target.date1.value instanceof Date); //false
            // console.log(typeof event.target.date1.value); //string

            Rides.insert({
                rountTrip: template.roundTrip.get(),
                trip1:{
                    from: event.target.from1.value,
                    to: event.target.to1.value,
                    date: new Date(event.target.date1.value),
                    time: event.target.time1.value,
                    comment: event.target.comment1.value
                },
                trip2:(()=>{
                    if(template.roundTrip.get()){
                        return {
                            from: event.target.from2.value,
                            to: event.target.to2.value,
                            date: new Date(event.target.date2.value),
                            time: event.target.time2.value,
                            comment: event.target.comment2.value
                        };
                    }else{
                        return {};
                    }
                })(),
                createdAt: new Date(),
                createdById: Meteor.userId(),
                effective: true,
                lastEffectiveDay: (()=>{
                    if(template.roundTrip.get()){
                        return new Date(event.target.date2.value);
                    }else{
                        return new Date(event.target.date1.value);
                    }
                })()
            });
        }
        Session.set('newRide', false);
        return false; //no default submit
    },
    'click .cancel-new-ride-js': () => {
        Session.set('newRide', false);
    }

});

Template.NewRide.helpers({
    'roundTrip'(){
        return Template.instance().roundTrip.get();
    },
    'col'(){
        return Template.instance().roundTrip.get()? 'col-md-6' : 'col-md-12';
    },
    'btnRoundTrip'(){
        return Template.instance().roundTrip.get()? 'btn-primary' : 'btn-default';
    },
    'btnSingleTrip'(){
        return Template.instance().roundTrip.get()? 'btn-default' : 'btn-primary';
    },
});