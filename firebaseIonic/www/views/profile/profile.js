'Use Strict';
angular.module('App').controller('profileController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $log, Auth, FURL, Utils) {
  var ref = firebase.database().ref(); 

 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $scope.user = user;
  } else {
    // No user is signed in.
  }
});
}

);
