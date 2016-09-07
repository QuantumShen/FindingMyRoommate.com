Rides = new Mongo.Collection('rides');

// Rides.allow({
// 	insert: function(userId, doc) {
// 		return !!userId;
// 	},
// 	update: function(userId, doc) {
// 		return !!userId;
// 	}
// });
//disable any client side operation
Rides.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Rides.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});



Trip = new SimpleSchema({
    category: {
        type: Number,
        label: "Category",
    },

	from: {
		type: String,
		label: "From" ,
        max: 40
	},
	to: {
		type: String,
		label: "To",
        max: 40
	},
	date: {
		type: Date,
		label: "Date"
	},
    time:{
        type: String,
        label: "To",
        max: 40
    },
    description:{
        type: String,
        label: "description",
        optional: true,
        max: 300
    }
});

Talk = new SimpleSchema({
	replyTo: {
		type: String,   //will be the userId to reply to 
		label: "ReplyTo"  ,
        max: 50,
	},
	text: {
		type: String,
		label: "Talking Text",
        max: 200,
	},
	createdAt:{
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date();
		},
	}

});




RidesSchema = new SimpleSchema({
	trip1: {
		type: Trip  //Trip array
	},
    trip2: {
        type: Trip,  //Trip array
        optional: true
    },

    active:{
        type: Boolean,
        label: "activeness",
        autoValue: function(){
            //THIS is bug-prone:
            //THIS.field() is not the field in the collection doc, but the field to insert or update!
            //so, if the doc has not 'activeTo' field, it will be undefined, so it always goes to false branch.

            //By the way, even I have 'active' in the doc to update, it still try to use this autoValue. This is nonsense!
            var activeTo = this.field('activeTo').value;
            if(activeTo >= (new Date())){
                if(this.field('active').value === undefined){
                    return true;
                }else{
                    //return this.field('active').value;
                    return; //leave the place with no autovalue.
                }

            }else{
                return false;
            }
            
            //if 'active' exists, just return to use the existing value;
        }
    },

	roundTrip: {
		type: Boolean,
        label: "Round trip or not"
	},

    offerRide:{
        type: Boolean,
        label: "Offer a ride or need a ride"
    },

    activeTo:{
        type: Date,
        label: "Last active day"
    },

	creator: {
		type: String,
		label: "Creater ID",
		autoValue: function () {
            if(this.isInsert){
                return Meteor.userId();
                //this.userId is null on server side
            }else{
                this.unset(); //for the update in publish
            }
			
            
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
            if(this.field('createdAt').value === undefined){
                return new Date();
            }
            //when I don't want to update createdAt, I just put createdAt inside the doc to insert or update
		},
	},

    contact:{
        type: String,
        label: "Contact Method",
        optional: true
    },

    //Two experiments
	likes: {
		type: Number,
		label: "Count of likes",
		autoValue: ()=>0,
	},
    talks: {
        type: [Talk],
        optional: true
    },
});


Rides.attachSchema(RidesSchema);



