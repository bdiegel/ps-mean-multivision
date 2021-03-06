angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location){
	$scope.identity = mvIdentity;
	$scope.signin = function(username, password) {
		mvAuth.authenticateUser(username, password).then(function(success) {

			if (success) {
				mvNotifier.notify('You have successfully logged in');
			} else {
				mvNotifier.notify('Username/Password combination incorrect');
			}
		});

	// clear user name and password fields on signout and redirect user to home page
	$scope.signout = function(username, password) {
		mvAuth.logoutUser().then(function() {
			$scope.username = "";
			$scope.password = "";
			mvNotifier.notify('You have successfully signed out');
			$location.path('/');
		});
	};

		// This code was refactored into a new Service 'mvAuth' and uses a promise
		//console.log("I'm logging in");
		// $http.post('/login', {username:username, password:password}).then(function(response){
		// 	if (response.data.success) {
		// 		mvIdentity.currentUser = response.data.user;
		// 		mvNotifier.notify('You have successfully logged in');
		// 	} else {
		// 		mvNotifier.notify('Username/Password combination incorrect');
		// 	}
		// });
	};
});