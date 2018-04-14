app.controller('AddUser', function ($scope,UsuarioService,UsuarioDepartamento, $timeout,$state) {

    var vm = this;
    vm.departamentos = [];
    vm.areaTrabajos = [];
    
    vm.registro = {
        
    };
    
    vm.getDepartamentos = function () {

        UsuarioDepartamento.findAll().success(function (data, status) {
            console.log(data);

            vm.departamentos = data;
            

        }).error(function (data, status) {
            console.error(data);
        });
        
    };
    
    vm.getAreaTrabajos = function (departamentoId) {
              
        
        UsuarioDepartamento.getfindByDepartamentoId(departamentoId).success(function (data, status) {
            console.log(data);

            vm.areaTrabajos = data;

        }).error(function (data, status) {
            console.error(data);
        });
    };
    
    

      vm.registrar = function () {

        console.log(vm.registro);
        
               
           UsuarioService.onCreate(vm.registro).success(function (data, status) {
        
            if (status === 200) {
                
                /*
                var params = {
                    password: vm.registro.password,
                    usuario: vm.registro.usuario
                };

                $state.go('login', params);
                */
               
               
               $state.go('main.users', {});
               
            }

         
        }).error(function (data, status) {
            console.error(data);
        });

    };
    
    $timeout(function () {
        vm.getDepartamentos();
        vm.getAreaTrabajos();
     }, 1000);

});