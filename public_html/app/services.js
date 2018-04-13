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

    service.onCreate = function (registro) {
        return $http({
            url: getUrl(),
            method: 'POST',
            data: registro,
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
    
    service.getfindByDepartamentoId = function (departamentoId) {
        return $http({
            url: getUrl() + 'getfindByDepartamentoId',
            method: 'GET',
            params: {'departamentoId': departamentoId}
        });
    };

});