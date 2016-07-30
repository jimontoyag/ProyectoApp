'Use Strict';
angular.module('App').controller('homeController', function ($scope, $cordovaBarcodeScanner, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var ref = firebase.database().ref();

  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
  }
  
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
