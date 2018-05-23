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
    
    service.findAll = function () {
        return $http({
            url: getUrl(),
            method: 'GET',
            params: {}
        });
    };
    
    service.getfindByAreatrabajoId = function (areatrabajoId) {
        return $http({
            url: getUrl() + 'getfindByUsuario2',
            method: 'GET',
            params: {'idArea': areatrabajoId}
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


app.service('Ticketcreado', function ($http, WS_URL) {

    var service = this, path = 'api/Ticket';

    function getUrl() {
        return WS_URL + path;
    }

    service.crearticketon = function (ticket,correo) {
        return $http({
            url: getUrl() + '/',
            method: 'POST',
            data: ticket,
            params: {'correo': correo}
        });
    };
    
 service.ticketmostrar = function (idDepartamento) {
        return $http({
            url: getUrl() + '/',
            method: 'GET',
            params: {'idDepartamento': idDepartamento}
        });
    };
    
    service.ticketAsignacion = function (idTicket,idUsuarioAsig,idArea,nombreActualizado,idDepartamento) {
        return $http({
            url: getUrl() + '/encabezadoTicket',
            method: 'POST',
            params: {'idTicket': idTicket,'idUsuarioAsig': idUsuarioAsig,'idArea': idArea,'nombreActualizado':nombreActualizado,'idDepartamento':idDepartamento}
        });
    };
    
        
    service.ticketAsignacionmostrar = function (idUsuario) {
        return $http({
            url: getUrl() + '/myTicket',
            method: 'GET',
            params: {'idUsuario': idUsuario}
        });
    };
    
    service.myticketcreadomostrar = function (idUsuario) {
        return $http({
            url: getUrl() + '/myTicketCreado',
            method: 'GET',
            params: {'idUsuario': idUsuario}
        });
    };

});

app.service('TicketDetallecreado', function ($http, WS_URL) {

    var service = this, path = 'api/TicketDetalle';

    function getUrl() {
        return WS_URL + path;
    }

    service.crearticketDetalle = function (asunto,ticketId,nombreAsignado,nombreDeptoArea) {
        return $http({
            url: getUrl() + '/',
            method: 'POST',
            params: {'asunto':asunto,'ticketId':ticketId,'nombreAsignado':nombreAsignado,'nombreDeptoArea':nombreDeptoArea}
        });
    };
    
    service.ticketAsignacioDetallenmostrar = function (ticketId) {
        return $http({
            url: getUrl() + '/getactualizar',
            method: 'GET',
            params: {'ticketId': ticketId}
        });
    };

});