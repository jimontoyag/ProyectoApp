angular.module('App').factory('Utils', function($ionicLoading,$ionicPopup) {

	var Utils = {

    show: function() {
      $ionicLoading.show({
  	    animation: 'fade-in',
  	    showBackdrop: false,
  	    maxWidth: 200,
  	    showDelay: 500,
        template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
      });
    },

    hide: function(){
      $ionicLoading.hide();
    },

		alertshow: function(tit,msg){
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

		errMessage: function(err) {

	    var msg = err.message;

	    if(err && err.code) {
	      switch (err.code) {
	        case "auth/invalid-credential":
	          msg = "Este correo ya ha sido tomado."; break;
	        case "auth/operation-not-allowed":
	          msg = "Operación no permitida"; break;
            case "auth/user-disabled":
	          msg = "El usuario se encuentra inhabilitado."; break;
	        case "auth/user-not-found":
	          msg = "El usuario no existe."; break;
	        case "auth/wrong-password":
	          msg = "Contraseña incorrecta."; break;
	        default: msg = err.message;
	      }
	    }
			Utils.alertshow("Error",msg);
	},


  };

	return Utils;

});
