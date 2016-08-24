'Use Strict';
angular.module('App').factory('PromOffFactory', function($interval,$log){

	var promosLista={};	

  function hoy(){
	    return parseInt(moment.tz('America/Bogota').format("YYYYMMDDHHmm"));
	  }

  // Hace referencia a las promos de la ciudad trayendo solo los del día
  var promosRefUID= firebase.database().ref('promos/ciudad2')
                      .orderByChild('fechaFin').startAt(hoy());  
  

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

//Evento que se acciona cuando se agrega una promo 
  promosRefUID.on('child_added',function(snapshot){ 
    if(promosLista){
      if(promoValido(snapshot.val())){
        promosLista[snapshot.key] = snapshot.val();
      }
    }       
  });

//Evento que se acciona cuando se edita una promo 
  promosRefUID.on('child_changed',function(snapshot){ 
    $log.log('EVENTO');
    if(promosLista){
      $log.log('LISTA');
      if(promoValido(snapshot.val())){        
        promosLista[snapshot.key]= snapshot.val();
      }else{
        delete promosLista[snapshot.key];
      }
    }       
  });

//Evento que se acciona cuando se elimina una promo 
  promosRefUID.on('child_removed',function(snapshot){ 
    if(promosLista){
      delete promosLista[snapshot.key];
    }       
  });

  var PromOffFactory = {

		getPromosLista: function(){
			return promosLista;
		},

    cargaLista: function(){
      //Carga la lista la primera vez
      promosRefUID.once('value').then(function(snapshot){        
            llenaPromosSnapshot(snapshot);
          });
    }
	};

	// Verifica que los promos estén dentro de las fechas
  function verificarPromos(){
    for(var key in promosLista){
      promo = promosLista[key];
       if(!promoValido(promo)){
        delete promosLista[key];
      }
    } 
  }

	// Llama a verificar los promos cada 5 segundos
  $interval(function () {
      verificarPromos();
  }, 5000);

return PromOffFactory;

});