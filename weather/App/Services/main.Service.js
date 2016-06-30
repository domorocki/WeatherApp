var app = angular.module('weather');    
app.factory('mainService', mainService);

function mainService($http) {
var bio = 'add text'
    var getWeather = function () {

        return $http({
            method: 'GET',
            url: 'https://api.klix.ba/v1/gradovi'
        })
    }
    var service = {
        bio: bio,
        getWeather: getWeather
    };
    return service;

};