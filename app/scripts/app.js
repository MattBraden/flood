'use strict';

angular
	.module('floodGame', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/game.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});