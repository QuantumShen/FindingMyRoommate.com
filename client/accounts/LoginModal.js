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

