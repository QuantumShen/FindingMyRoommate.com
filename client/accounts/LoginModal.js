// Template.LoginModal.onRendered(function(){
//     this.autorun(()=>{
//         if(Meteor.userId()){
//             //console.log(Meteor.userId());
//             $('#loginModal').modal('hide');
//         }
//     });

// });

Accounts.onLogin(function(){
    $('#loginModal').modal('hide');
});


Template.LoginModal.events({
    'click .close': function(){
        setTimeout(()=>{
            AccountsTemplates.setState("signIn");
        }, 500);
    }
});

