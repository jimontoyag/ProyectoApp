'Use Strict';
angular.module('App').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup,$firebaseAuth , $firebaseObject,$log, Auth, Utils) {
  //var ref = new Firebase(FURL);
  //firebase.initializeApp(FURL);
  $scope.signIn = function (user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user);
    Utils.hide();  
      
    }
  };

  firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          Utils.hide();
          $state.go('menu.promOff');
        } else {
          // No user is signed in.
        }
    });
  
/* SEEMS NOT WORKING WELL

  $scope.loginWithGoogle =  function(){
  var provider = new firebase.auth.GoogleAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');
  
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };

*/

/* SEEMS NOT WORKING WELL
  $scope.loginWithFacebook =  function(){
    var provider = new firebase.auth.FacebookAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');
  
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };
  */
  
/* SEEMS NOT WORKING WELL
  $scope.loginWithTwitter =  function(){
    var provider = new firebase.auth.FacebookAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');
  
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };
*/

});
