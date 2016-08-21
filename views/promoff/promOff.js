'Use Strict';
angular.module('App').controller('promOffCtrl', function ( $interval, $scope, $cordovaBarcodeScanner,$log, $state, $location,$http,$ionicPopup,  PromOffFactory) {


$scope.promos = PromOffFactory.getPromosLista();


// Scroll refresh
   $scope.doRefresh = function() {
    refrescaEstado();
    $scope.$broadcast('scroll.refreshComplete');
  };
//TODO - Mejorar - Actualiza los valores en la página
  function refrescaEstado(){
    $state.go($state.current, {}, {reload: true});
  }

  function verMasPromo(promo){
    infoPromo.setPromo(promo); 
    $state.go('promoInf');//Hacer ruta y html
  }

  $scope.remainTime=
  function (promo) {
          var ahora = moment.tz('America/Bogota');
          var finPromo = moment(''+promo.fechaFin,'YYYYMMDDHHmm');
            return finPromo.fromNow();                    
            };

  moment.updateLocale('en', {
    relativeTime : {
        future: "%s",
        past:   "%s ago",
        s:  "unos segundos",
        m:  "un minuto",
        mm: "%d minutos",
        h:  "una hora",
        hh: "%d horas",
        d:  "un dia",
        dd: "%d dias",
        M:  "un mes",
        MM: "%d meses",
        y:  "a year",
        yy: "%d years"
    }
});

  $scope.profile = function () {
      $location.path("/profile");
  }

  $scope.leerCodigo = function() {
            $cordovaBarcodeScanner.scan().then (function (imagenEscaneada) {
                alert(imagenEscaneada.text);
            },function(error) {
                alert("ha ocurrido un error : "+error);
            });
        }
}
);
