app.service('UsuarioService', function ($http, WS_URL) {

    var service = this, path = 'api/Usuario/';
    
    function getUrl() {
        return WS_URL + path;
    }
    
    service.findAll = function(page, pageSize){
        return $http({
            url: getUrl(),
            method: 'GET',
            params: {'page': page, 'pageSize': pageSize}
        });
    };

    service.onCreate = function (usuario) {
        return $http({
            url: getUrl(),
            method: 'POST',
            data: usuario,
            params: {}
        });
    };

});

app.service('UsuarioDepartamento', function ($http, WS_URL) {

    var service = this, path = 'api/Departamento/';

    function getUrl() {
        return WS_URL + path;
    }

    service.findAll = function () {
        return $http({
            url: getUrl(),
            method: 'GET',
            params: {}
        });
    };
    
    service.getId = function (id) {
        return $http({
            url: getUrl() + 'getId',
            method: 'GET',
            params: {'id': id}
        });
    };
    
    service.getfindByDepartamentoId = function (departamentoId) {
        return $http({
            url: getUrl() + 'getfindByDepartamentoId',
            method: 'GET',
            params: {'departamentoId': departamentoId}
        });
    };
    
    service.getAreaById = function (id) {
        return $http({
            url: getUrl() + 'getById',
            method: 'GET',
            params: {'id': id}
        });
    };

});

app.service('UsuarioSesion', function ($http, WS_URL) {

    var service = this, path = 'api/Sesion';

    function getUrl() {
        return WS_URL + path;
    }

    service.login = function (correo, password) {
        return $http({
            url: getUrl() + '/login',
            method: 'GET',
            params: {'correo': correo, 'password': password}
        });
    };
    
    service.logout = function (token) {
        return $http({
            url: getUrl() + '/logout',
            method: 'POST',
            params: {'token': token}
        });
    };

});