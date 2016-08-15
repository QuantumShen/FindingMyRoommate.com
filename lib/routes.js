if(Meteor.isClient){
	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}

// FlowRouter.triggers.enter([function(context, redirect){
// 	if(!Meteor.userId() && context.path !== '/') {
// 		FlowRouter.go('login');   //always go 'home' if not login
// 	}
// }]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout');
		$('#loginModal').modal('show');
	}
});


FlowRouter.route('/rides', {
	name: 'rides',
	action() {
		if(!Meteor.userId()) {
			FlowRouter.go('login');   //always go 'home' if not login
		}
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Rides'});
	}
});

FlowRouter.route('/ride/:id', {
	name: 'ride',
	action() {
		if(!Meteor.userId()) {
			FlowRouter.go('login');   //always go 'home' if not login
		}
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'SingleRide'});
	}
});


FlowRouter.route('/roommates', {
	name: 'roommates',
	action() {
		if(!Meteor.userId()) {
			FlowRouter.go('login');   //always go 'home' if not login
		}
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Roommates'});
	}
});


FlowRouter.route('/subleases', {
	name: 'subleases',
	action() {
		if(!Meteor.userId()) {
			FlowRouter.go('login');   //always go 'home' if not login
		}
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Subleases'});
	}
});


FlowRouter.route( '/verify-email/:token', {
	name: 'verify-email',
	action( params ) {
		Accounts.verifyEmail( params.token, ( error ) =>{
			if ( error ) {
				Bert.alert( error.reason, 'danger' );
			} else {
				FlowRouter.go( '/' );
				Bert.alert( 'Email verified! Thanks!', 'success' );
			}
		});
	}
});