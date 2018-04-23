/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngCookies', 'chart.js']);

app.constant('WS_URL', 'http://localhost:8084/TicketsWS/');
//'http://192.168.0.4:8084/TicketsWS/'

app.factory('interceptor', function ($q, $cookies, $injector) {
    return {
        'request': function (config) {
            if (config.url.indexOf('http') === 0) {

                var session = $cookies.getObject('TicketsUMG');

                if (session !== undefined) {


                    if (config.params === undefined) {
                        config.params = {'token': session.token, 'userId': session.userId};
                    } else {
                        config.params.token = session.token;
                        config.params.userId = session.userId;
                    }
                }
            }
            return config;

        },
        'response': function (response) {
            return response;
        }
    };
});


app.config(function ($stateProvider, $httpProvider) {

    $httpProvider.interceptors.push('interceptor');

    $stateProvider
            .state('login', {
                url: '/login?password&usuario',
                views: {
                    "index": {
                        controller: 'LoginUsuario as vm',
                        templateUrl: 'templates/login.html'
                    }
                },
                params: {
                    password: null,
                    usuario: null
                }
            })
            .state('Menu', {
                url: '/Menu',
                views: {
                    "index": {
                        templateUrl: 'templates/Menu.html',
                        controller: 'MenuController as vm'
                    }
                }
            })
            .state('Principal', {
                url: '/Principal',
                views: {
                    "index": {
                        controller: 'AddUser as vm',
                        templateUrl: 'templates/Principal.html'
                    }
                }
            });


});

app.run(function ($state) {

    $state.transitionTo("Menu");

});