angular.module('App').factory('Auth', function(Utils, $state,PromOffFactory,$timeout) {

  var auth = firebase.auth();

  auth.onAuthStateChanged(function(user) {
        if (user) {          
          PromOffFactory.cargaLista();
          $timeout(preLoad, 2000);          
        } else {
          // No user is signed in.
          $state.go('login');
        }
    });

  function preLoad(){
    Utils.hide();
    $state.go('menu.promOff');
  }

	var Auth = {

    login: function(user) {
      firebase.auth().signInWithEmailAndPassword(user.email,user.password).catch(function(error) {
        // Manejo de errores inicio de sesión        
        Utils.errMessage(error);    
      });
    },

    register: function(user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
          // Handle Errors here.
          Utils.errMessage(error);  
          // ...
        });
    },

    logout: function() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }, function(error) {
        // An error happened.
        Utils.errMessage(error);  
      });
      },

		resetpassword: function(email) {
      auth.sendPasswordResetEmail(email).then(function() {
          // Email sent.
        }, function(error) {
          // An error happened.
          Utils.errMessage(error);
        });
    },

		changePassword: function(newPassword) {
        auth.currentUser.updatePassword(newPassword).then(function() {
        // Update successful.
        Utils.alertshow("Exito.","Se ha cambiado correctamente la contraseña.");
      }, function(error) {
        // An error happened.
        Utils.errMessage(error);  
      });
		},

    signInWithProvider: function(provider) {
      return Auth.signInWithPopup('google');
    }
	};
	return Auth;

});
