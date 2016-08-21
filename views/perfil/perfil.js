'Use Strict';
angular.module('App').controller('perfilCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $log, Auth,  Utils) {
  var ref = firebase.database().ref(); 

  $scope.logOut = function () {
      Auth.logout();
  };

 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $scope.user = user;
  } else {
    // No user is signed in.
    $state.go("login");
  }
});

});
