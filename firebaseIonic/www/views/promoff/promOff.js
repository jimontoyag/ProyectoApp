'Use Strict';
angular.module('App').controller('promOffCtrl', function ( $interval, $scope, $cordovaBarcodeScanner,$log, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  var hoy = parseInt(moment.tz('America/Bogota').format("YYYYMMDDHHmm"));

  var promosRefUID= firebase.database().ref('promos')
                      .orderByChild('fechaFin').startAt(hoy);

  $scope.promos;

//Revisar actualización automática en móvil
promosRefUID.on('value', function(snapshot){ 
  $scope.promos =[];
    snapshot.forEach(function(pUID){
      $scope.promos.push(pUID.val());
    });    
    $scope.promos.forEach(function(promo){
      if(promo.fechaInicio > hoy){
        $scope.promos.splice(promo,1);
      } 
    });    
    refrescaEstado();
  });

  function read_prop(obj,prop){
    return obj[prop];
  }
   $scope.doRefresh = function() {
    refrescaEstado();
    $scope.$broadcast('scroll.refreshComplete');
  };
//TODO - Mejorar
  function refrescaEstado(){
    $state.go($state.current, {}, {reload: true});
  }

  $scope.remainTime=
  function (promo) {
          var ahora = moment.tz('America/Bogota');
          var finPromo = moment(''+promo.fechaFin,'YYYYMMDDHHmm');
          if(ahora.isBefore(finPromo)){
            return finPromo.fromNow();
          } else {
            $log.log('Saca '+promo.titulo);
            $scope.promos.splice(promo,1);
          }                    
            };

  $interval(function () {
      refrescaEstado();
  }, 10000);

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
