Template.NewRide.onCreated(function() {
  this.roundTrip = new ReactiveVar(false);  //this is the template instance
  this.ckResult = new ReactiveVar(true);
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
                    from: checkStringNotEmpty(t.from1.value, ckResult),
                    to: checkStringNotEmpty(t.to1.value, ckResult),
                    date: new Date(checkStringNotEmpty(t.date1.value, ckResult)),
                    time: checkStringNotEmpty(t.time1.value, ckResult),
                    comment: event.target.comment1.value
                }
            };
            if(doc.roundTrip){
                doc.trip2 = {
                    from: checkStringNotEmpty(t.from2.value, ckResult),
                    to: checkStringNotEmpty(t.to2.value, ckResult),
                    date: new Date(checkStringNotEmpty(t.date2.value, ckResult)),
                    time: checkStringNotEmpty(t.time2.value, ckResult),
                    comment: event.target.comment2.value
                };
            }

            if(!ckResult.get()){
                Bert.alert( 'All required fields should be filled!', 'danger', 'fixed-top', 'fa-frown-o' );
                return false;
            }

            var effectiveTo = doc.trip1.date;
            
            if(doc.trip2 && doc.trip1.date<doc.trip2.date){
                effectiveTo = doc.trip2.date;
            }

           
            doc.effectiveTo = new Date(effectiveTo);
            doc.effectiveTo.setDate(doc.effectiveTo.getDate()+1);

            console.log(doc.trip1.date);
            console.log(doc.effectiveTo);
    
            Meteor.call('insertRide', doc, function(error, result){
                if(error || !result){
                    Bert.alert( 'Sorry for Internal Error. Please tell me: support@findingmyroommate.com', 'danger', 'fixed-top', 'fa-frown-o' );
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