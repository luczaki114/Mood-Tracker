moodTracker.service('LoginService', ['$window', '$http', function($window, $http) {
	var isLoggedInDummy = function () {
		return false;
	}

	var saveToken = function (token) {
		$window.localStorage['hashTrack-token'] = token;
	};

	var getToken = function () {
		return $window.localStorage['hashTrack-token'];
	};

	var register = function (user) {
		return $http.post('/register', user).success(function(data) {
			saveToken(data.token);
		});
	};

	var login = function (user) {
		return $http.post('/login', user).success(function(data) {
			saveToken(data.token);
		});
	};

	var logout = function () {
		$window.localStorage.removeItem('hashTrack-token');
	};

	var isLoggedIn = function() {
		var token = getToken();
		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	var currentUser = function() {
		if (isLoggedIn()) {
			var token = getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return {
				email_address: payload.email_address,
				_id: payload._id
			};
		};
	};

	return {
		saveToken: saveToken,
		getToken: getToken,
		register: register,
		login: login,
		logout: logout,
		isLoggedIn: isLoggedIn,
		currentUser: currentUser,
		isLoggedInDummy: isLoggedInDummy
	};
}]);

