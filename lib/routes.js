if(Meteor.isClient){
	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}

FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId() && context.path !== '/') {
		FlowRouter.go('login');   //always go 'home' if not login
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout', {modal: 'ModalClosed'});
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout', {modal: 'ModalOpen'});
		$('#loginModal').modal('show');
	}
});


FlowRouter.route('/rides', {
	name: 'rides',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Rides'});
	}
});

FlowRouter.route('/ride/:id', {
	name: 'ride',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'SingleRide'});
	}
});


FlowRouter.route('/roommates', {
	name: 'roommates',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Roommates'});
	}
});


FlowRouter.route('/subleases', {
	name: 'subleases',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Subleases'});
	}
});
