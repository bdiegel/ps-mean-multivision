angular.module('app').factory('mvAuth', function($http, mvIdentity, $q){
	return {
		authenticateUser: function(username, password) {
			// create (and return) a promise
			var dfd = $q.defer();
			$http.post('/login', {username:username, password:password}).then(function(response){
				if (response.data.success) {
					mvIdentity.currentUser = response.data.user;
					//mvNotifier.notify('You have successfully logged in');
					dfd.resolve(true);
				} else {
					//mvNotifier.notify('Username/Password combination incorrect');
					dfd.resolve(false);
				}
			});
			return dfd.promise;
		}
	};
});