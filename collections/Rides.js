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
            var activeTo = this.field('activeTo').value;
            if(activeTo >= (new Date())){
                return true;
            }else{
                return false;
            }
        }
    },

	roundTrip: {
		type: Boolean,
        label: "Round trip or not"
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
			return new Date();
		},
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



