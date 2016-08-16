Rides = new Mongo.Collection('rides');

Rides.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

Trip = new SimpleSchema({
	from: {
		type: String,
		label: "From" ,
        max: 100
	},
	to: {
		type: String,
		label: "To",
        max: 100
	},
	date: {
		type: Date,
		label: "Date"
	},
    time:{
        type: String,
        label: "To",
        max: 100
    },
    comment:{
        type: String,
        label: "Comment",
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

    effective:{
        type: Boolean,
        label: "Effectiveness",
        autoValue: function(){
            var effectiveTo = this.field('effectiveTo').value;
            if(effectiveTo >= (new Date())){
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

    effectiveTo:{
        type: Date,
        label: "Last effective day"
    },

	creater: {
		type: String,
		label: "Creater ID",
		autoValue: function () {
            //console.log(this);
			return Meteor.userId();
            //return this.userId;
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



