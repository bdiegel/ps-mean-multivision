angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http){
	$scope.signin = function(username, password) {
		//console.log("I'm logging in");
		$http.post('/login', {username:username, password:password}).then(function(response){
			if (response.data.success) {
				console.log("I'm logging in");
			} else {
				console.log("login failed");
			}
		});
	};
});