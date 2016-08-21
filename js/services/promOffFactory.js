'Use Strict';
angular.module('App').factory('PromOffFactory', function($interval){

	var promosLista={};	

  function hoy(){
	    return parseInt(moment.tz('America/Bogota').format("YYYYMMDDHHmm"));
	  }

  // Hace referencia a las promos de la ciudad trayendo solo los del día
  var promosRefUID= firebase.database().ref('promos/ciudad2')
                      .orderByChild('fechaFin').startAt(hoy());

  //Carga la lista la primera vez
  promosRefUID.once('value').then(function(snapshot){
    llenaPromosSnapshot(snapshot);
  });

  // Llena la lista promos con los objetos en la referencia.
  function llenaPromosSnapshot(snapshot){
    snapshot.forEach(function(pUID){ 
      promosLista[pUID.key] = pUID.val(); 
    });
    for(var key in promosLista){
      promo = promosLista[key];
       if(promo.fechaInicio > hoy()){
          delete promosLista[key];
        } 
    } 
  }

  //Verifica que las fechas de la promo sean válidas
  function promoValido(promo){
    if(promo.fechaInicio > hoy() || promo.fechaFin < hoy()){
      return false;
    } else {
      return true;
    }
  }

  promosRefUID.on('child_added',function(snapshot){ 
    if(promosLista){
      if(promoValido(snapshot.val())){
        promosLista[snapshot.key] = snapshot.val();
      }
    }       
  });

  promosRefUID.on('child_changed',function(snapshot){ 
    if(promosLista){
      if(promoValido(snapshot.val())){        
        promosLista[snapshot.key]= snapshot.val();
      }
    }       
  });

  promosRefUID.on('child_removed',function(snapshot){ 
    if(promosLista){
      delete promosLista[snapshot.key];
    }       
  });

  var PromOffFactory = {

		getPromosLista: function(){
			return promosLista;
		}

	};

	// Verifica que los promos estén dentro de las fechas
  function verificarPromos(){
    entra = false;
    for(var key in promosLista){
      promo = promosLista[key];
       if(!promoValido(promo)){
        delete promosLista[key];
        entra = true;
      }
    } 
    if(entra) {}
  }

	// Llama a verificar los promos cada 30 segundos
  $interval(function () {
      verificarPromos();
  }, 10000);

return PromOffFactory;

});