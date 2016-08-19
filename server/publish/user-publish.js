Meteor.publish('UserInfo', function(id){
    // console.log(id);
    return Users.find({_id: id},{
        fields:{
            username: 1,
            emails: 1
        }
    });
});