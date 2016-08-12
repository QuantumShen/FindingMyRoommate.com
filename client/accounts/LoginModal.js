Template.LoginModal.events({
    'click .close-login': ()=>{
        Session.set('modal-open-status', ''); 
        //use variable 'nav-toggle' to control modal display
    }
});