app.controller('AddUser', function ($scope,UsuarioService,UsuarioDepartamento, $timeout,$state) {

    var vm = this;
    vm.departamento = [];
    vm.areaTrabajo = [];
    
    vm.getDepartamento = function () {

        UsuarioDepartamento.findAll().success(function (data, status) {
            console.log(data);

            vm.departamento = data;
            

        }).error(function (data, status) {
            console.error(data);
        });
        
    };
    
    vm.getAreaTrabajo = function (departamentoId) {
              
        
        UsuarioDepartamento.getfindByDepartamentoId(departamentoId).success(function (data, status) {
            console.log(data);

            vm.areaTrabajo = data;

        }).error(function (data, status) {
            console.error(data);
        });
    };
    
    

      vm.registrar = function () {

        console.log($scope.registerForm.$invalid);

        console.log(vm.registro);

        if ($scope.registerForm.$invalid) {
            return false;
        }

       
        vm.isShowProgressLinear = true;
        UsuarioService.onCreate(vm.registro).success(function (data, status) {
            vm.isShowProgressLinear = false;

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



            console.log(data);
        }).error(function (data, status) {
            vm.isShowProgressLinear = false;
            console.error(data);
        });

    };
    
    $timeout(function () {
        vm.getDepartamento();
        vm.getAreaTrabajo();
     }, 1000);

});