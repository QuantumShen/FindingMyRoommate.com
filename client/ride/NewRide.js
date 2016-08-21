Template.NewRide.onCreated(function() {
  this.roundTrip = new ReactiveVar(false);  //this is the template instance
  this.ckResult = new ReactiveVar(true);
});


Template.NewRide.onRendered(function(){

    this.autorun(()=>{
        $('#date1').datepicker({
            dateFormat: 'yy-mm-dd'
        });

        if(this.roundTrip.get()){
            Tracker.afterFlush(()=>{
                $('#date2').datepicker({
                    dateFormat: 'yy-mm-dd'
                });
            });
            
        } 
    });

});

function checkStringNotEmpty(str, result){
    try{
        check(str, String);
        if(str.length === 0){
            result.set(false);
        }
        result.set(true);
        return str;
    }catch(e){
        console.log(e.message);
        result.set(false);
        return "";
    }

}

Template.NewRide.events({
    'click .fa-taxi': function(events,instance) {
        instance.roundTrip.set(false);
    },
    'click .fa-refresh': function(events,instance) {
        instance.roundTrip.set(true);
    },

    'submit .add-ride-js': function(event, instance){
        event.preventDefault();


        if(Meteor.user()){
            var t = event.target;
            var ckResult = instance.ckResult;
            var doc = {
                roundTrip: instance.roundTrip.get(),
                trip1:{
                    category: parseInt(checkStringNotEmpty(t.radio1.value, ckResult)),
                    from: checkStringNotEmpty(t.from1.value, ckResult),
                    to: checkStringNotEmpty(t.to1.value, ckResult),
                    date: new Date(checkStringNotEmpty(t.date1.value+"T00:00:00-04:00", ckResult)),
                    //should add time and zone, otherwise it will be UTC00:00
                    time: checkStringNotEmpty(t.time1.value, ckResult),
                    description: event.target.description1.value
                },
                contact: event.target.contact.value
            };
            if(doc.roundTrip){
                doc.trip2 = {
                    category: parseInt(checkStringNotEmpty(t.radio2.value, ckResult)),
                    from: checkStringNotEmpty(t.from2.value, ckResult),
                    to: checkStringNotEmpty(t.to2.value, ckResult),
                    date: new Date(checkStringNotEmpty(t.date2.value+"T00:00:00-04:00", ckResult)),
                    time: checkStringNotEmpty(t.time2.value, ckResult),
                    description: event.target.description2.value
                };
            }

            if(!ckResult.get()){
                Bert.alert( 'All required fields should be filled!', 'danger', 'fixed-top', 'fa-frown-o' );
                return false;
            }

            var activeTo = doc.trip1.date;
            
            if(doc.trip2 && doc.trip1.date<doc.trip2.date){
                activeTo = doc.trip2.date;
            }


            doc.activeTo = new Date(activeTo);
            doc.activeTo.setDate(doc.activeTo.getDate()+1); //active to the end of the day
            Meteor.call('insertRide', doc, function(error, result){
                if(error){
                    Bert.alert( 'Input Error! Try to limit the required fields to less than 40 characters.', 'danger', 'fixed-top', 'fa-frown-o' );
                    return false;
                }
                if(!result){
                    Bert.alert( 'Not Logged In! ', 'danger', 'fixed-top', 'fa-frown-o' );
                    return false;
                }
            });
            Session.set('newRide', false);
            Bert.alert( 'Successfully Published', 'success', 'fixed-top', 'fa-smile-o' );
        }//end if


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