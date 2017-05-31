moodTracker.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MoodRecordController',
    templateUrl: 'app/components/moodRecord/moodRecordTemplate.html'
  }).when('/login', {
    	controller: 'LoginController',
    	templateUrl: 'app/shared/login/loginTemplate.html'
  }).otherwise({
    redirectTo: '/'
  });
});