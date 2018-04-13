/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngCookies', 'chart.js']);

app.constant('WS_URL', 'http://localhost:8084/TicketsWS/');

app.config(function ($stateProvider) {
   

     $stateProvider
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

    $state.transitionTo("Principal");

});