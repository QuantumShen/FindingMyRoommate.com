Template.Header.events({
    'click .login-button': ()=>{
        Session.set('modal-open-status', 'open');
        //use variable 'modal-toggle' to control modal display
        //the variable content is read in as class: .open

    },

    'click .logout-button': ()=>{
        Meteor.logout();
    }
});