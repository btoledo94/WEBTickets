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
            .state('menu', {
                url: '/menu',
                views: {
                    "index": {
                        templateUrl: 'templates/menu.html',
                        controller: 'MenuController as vm'
                    }
                }
            })
            .state('menu.Principal', {
                url: '/Principal',
                views: {
                    "menu": {
                        controller: 'AddUser as vm',
                        templateUrl: 'templates/Principal.html'
                    }
                }
            })
            .state('menu.crearTicket', {
                url: '/crearTicket',
                views: {
                    "menu": {
                       controller: 'AddTicketController as vm',
                        templateUrl: 'templates/crearTicket.html'
                    }
                }
            })
            .state('menu.bandejaTicket', {
                url: '/bandejaTicket',
                views: {
                    "menu": {
                        controller: 'ticketBandeja as vm',
                        templateUrl: 'templates/bandejaTicket.html'
                    }
                }
            });


});

app.run(function ($state) {

    $state.transitionTo("menu");

});