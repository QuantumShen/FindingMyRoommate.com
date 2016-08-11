FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()) {
		FlowRouter.go('home');   //always go 'home' if not login
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/rides', {
	name: 'rides',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'rides'});
	}
});

FlowRouter.route('/ride/:id', {
	name: 'ride',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'singleRide'});
	}
});