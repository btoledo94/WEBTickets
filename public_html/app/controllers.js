app.controller('AddUser', function ($scope, UsuarioService, UsuarioDepartamento, $timeout, $state) {

    var vm = this;
    vm.departamentos = [];
    vm.areaTrabajos = [];

    vm.departamento = {};
    vm.areaTrabajo = {};
    vm.registro = {};
    vm.registro.areaTrabajo = {};
    vm.registro.areaTrabajo.departamento = {};
    vm.registro.Correo;
    vm.registro.NombreUsuario;
    vm.registro.Password;

    vm.getDepartamentos = function () {

        UsuarioDepartamento.findAll().success(function (data, status) {

            console.log("Departamentos: ", data);
            vm.departamentos = data;

            console.log(vm.departamentos);

        }).error(function (data, status) {
            console.error(data);
        });

    };

    vm.getAreaTrabajos = function (dep) {

        console.log(dep);

        UsuarioDepartamento.getId(dep).success(function (data, status) {

            vm.departamento = data;

            UsuarioDepartamento.getfindByDepartamentoId(vm.departamento.id).success(function (data) {

                vm.areaTrabajos = data;

            }).error(function (data) {
                console.error(data);
            });


        }).error(function (data, status) {
            console.error(data);
        });

    };



    vm.registrar = function () {

        UsuarioDepartamento.getAreaById($scope.area).success(function (data) {

            vm.registro.correo=$scope.correo;
            vm.registro.nombreUsuario=$scope.nombreUsuario;
            vm.registro.password=$scope.password;
            vm.registro.areaTrabajo = data;
            vm.registro.areaTrabajo.departamento = vm.departamento;

            console.log("Lo que va a mandar a guardar ", vm.registro.correo);
            UsuarioService.onCreate(vm.registro).success(function (data, status) {

                if (status === 200) {

                    alert("Usuario Registrado Exitosamente");

                }


            }).error(function (data, status) {
                console.error(data);
            });

        }).error(function (err) {
            console.error(err);
        });
         vm.registro.correo='';
            vm.registro.nombreUsuario='';
            vm.registro.password='';
            vm.registro.areaTrabajo = {};
            vm.registro.areaTrabajo.departamento = {};
               $state.transitionTo("login");
   

    };

    vm.getDepartamentos();

});


app.controller('LoginUsuario', function ($stateParams, $rootScope, $scope, $mdSidenav, $state, $cookies, UsuarioSesion, $mdToast) {

    var vm = this;

    vm.validateSession = function () {

        var session = $cookies.getObject('TicketsUMG');

        if (session) {
            /**
             * validamos si el token es correcto
             */

            $state.transitionTo("Menu");

        } else {

            /**
             * Valido si me acabo de registrar como usuario hago login de una vez
             */
            if ($stateParams.password && $stateParams.usuario) {
                vm.correo = $stateParams.usuario;
                vm.password = $stateParams.password;

                vm.login(false);
            }

        }

    };

    vm.login = function (validaForm) {

        if (validaForm) {
            if ($scope.loginForm.$invalid) {
                return false;
            }
        }


        vm.isShowProgressLinear = true;
        UsuarioSesion.login(vm.correo, vm.password).success(function (data, status) {
            vm.isShowProgressLinear = false;

            console.log(data);

            if (status === 202) {

                $mdToast.show(
                        $mdToast.simple()
                        .hideDelay(3000)
                        .position('top right')
                        .textContent('Contraseña incorrecta')
                        );

            } else {

                var session = {
                    'token': data.token,
                    'userId': data.usuario.id,
                    'userName': data.usuario.nombreUsuario,
                    'userin': data.usuario.correo,
                    'menus': []
                };

                
                $cookies.putObject('TicketsUMG', session);

                console.log($rootScope);

                $state.transitionTo("Menu");

            }


        }).error(function (data, status) {

            console.log(status);

            vm.isShowProgressLinear = false;

            if (status === 404) {


                $mdToast.show(
                        $mdToast.simple()
                        .hideDelay(3000)
                        .position('top right')
                        .textContent('Usuario no existe')
                        );

                vm.correo = "";
                vm.password = "";

            } else {
                $mdToast.show(
                        $mdToast.simple()
                        .hideDelay(3000)
                        .position('top right')
                        .textContent('Error inesperado')
                        );
            }

        });

    };
    
    vm.openMenu = function (){
        console.log("entro aqui en open");
        $state.transitionTo("login");
        
    };


    vm.validateSession();

});

app.controller('MenuController', function ($mdSidenav, $state, $cookies,UsuarioSesion) {

    var vm = this;

vm.pantallas = [];

    vm.validateSession = function () {

        var session = $cookies.getObject('TicketsUMG');

        console.log(session);

        if (!session) {
            /**
             * validamos si el token es correcto
             */

            $state.transitionTo("login");
        } else {

            vm.pantallas = session;
        }

    };

    vm.abrirMenu = function () {
        $mdSidenav('appMenu').toggle().then(function () {
           
        });
    };

    
    vm.cerrarSesion = function (){
        UsuarioSesion.logout(vm.pantallas.token);
        console.log("entro aqui en open");
        $state.transitionTo("login");
        $cookies.remove('TicketsUMG');
        
    };
    
    vm.navigateTo = function (menuId, $event) {
        console.log(vm.pantallas);

        switch (menuId) {
            case -1:

                vm.cerrarSesion();

                break;
            case -2:
            vm.crearUsuario();
            break;
            case -3:
            vm.crearUsuario();
            break;
            default:
                break;
        }

    };
    
    vm.crearUsuario = function(){
        $state.go("Principal");
    };
    
    vm.mostrarUsuario = function(){
        $state.go("Principal");
    };
    
     vm.validateSession();
    
});