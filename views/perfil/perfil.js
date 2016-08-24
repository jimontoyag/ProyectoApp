'Use Strict';
angular.module('App').controller('perfilCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $log, Auth,  Utils) {
  
  $scope.logOut = function () {
      Auth.logout();
  };

});
