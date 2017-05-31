moodTracker.controller('LoginController', ['$scope', '$rootScope', 'LoginService', '$http', '$location', function($scope, $rootScope, LoginService, $http, $location) {
	// initialize credentials
	$scope.credentials = {
		email_address: "",
		password: "",
	};

	// make sure not logged in or else bounce them
	if (authentication.isLoggedIn()) $location.path('/');

	// initialize auth type
	$scope.authType = "select";

	//define the return page
	$scope.returnPage = $location.search().page || '/';

	$scope.submitAuth = function(email, password, authType) {
		console.log('Login button clicked...');
		console.log('Email address: ' + email);
		console.log('Auth type: ' + authType);
		$scope.credentials.email_address = email;
		$scope.credentials.password = password;
		$scope.authType = authType;
		$scope.checkCrecentials();
	};

	$scope.checkCrecentials = function() {
		if (!$scope.credentials.email_address || !$scope.credentials.password || !$scope.authType) {
			$scope.formError = "Please complete all fields";
		} else {
			$scope.doAuth($scope.authType);
		};
	};

	$scope.doAuth = function(authType) {
		$scope.formError = "";
		switch(authType) {
			case 'login':
				authentication
				.login($scope.credentials)
				.error(function(error) {
					$scope.formError = error.message;
				})
				.then(function() {
					console.log('login successful as user: ' + $scope.credentials.email_address);
					$rootScope.currentUser = authentication.currentUser().email_address;
					$location.search('page', null);
					$location.path($scope.returnPage);
				});
				break;
			case 'register':
				authentication
				.register($scope.credentials)
				.error(function(error) {
					$scope.formError = error.message;
				})
				.then(function() {
					console.log('successful registration as user: ' + $scope.credentials.email_address);
					$rootScope.currentUser = authentication.currentUser().email_address;
					$location.search('page', null);
					$location.path($scope.returnPage);
				});
				break;
			default:
				return;
		}
	};

}]);