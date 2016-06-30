
angular.module('weather', [
  'ngRoute' 
]).
config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'mainController',
        templateUrl: 'index.html'
    }).
    otherwise({
        redirectTo: '/'
    });
})