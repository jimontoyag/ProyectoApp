'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {

$stateProvider
// setup an abstract state for the tabs directive      
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('menu.promOff', {
    url: '/promos',
    views: {
      'side-menu21': {
        templateUrl: 'views/promoff/promOff.html',
        controller: 'promOffCtrl'
      }
    }
  })
  .state('menu.tienda', {
    url: '/tienda',
    views: {
      'side-menu21': {
        templateUrl: 'views/tienda/tienda.html',
        controller: 'tiendaCtrl'
      }
    }
  })

  .state('menu.perfil', {
    url: '/perfil',
    views: {
      'side-menu21': {
        templateUrl: 'views/perfil/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'views/templates/menu.html',
    abstract:true
  })
    ;
$urlRouterProvider.otherwise("/login");
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    var config = {
    apiKey: "AIzaSyABuEPq5zUUn1eMHf7RiOZy1ySmb4_9dWQ",
    authDomain: "backend1-e6024.firebaseapp.com",
    databaseURL: "https://backend1-e6024.firebaseio.com",
    storageBucket: "backend1-e6024.appspot.com",
  };
  firebase.initializeApp(config);
    
    // AdMob
            if(window.AdMob) {
                var admobid;

                if (device.platform == "Android") {
                    admobid = { // for Android
                        banner: 'ca-app-pub-8943241156434100/4304279677',
                        interstitial: 'ca-app-pub-8943241156434100/3994725276'
                    };
                } else {
                    admobid = { // for iOS
                        banner: 'ca-app-pub-8943241156434100/7257746078',
                        interstitial: 'ca-app-pub-8943241156434100/2378391279'
                    };
                }

                $adMob.createBanner( {
                    adId: admobid.banner,
                    autoShow: true,
                    bgColor: 'black',
                    position: $adMob.position.BOTTOM_CENTER
                });

                $adMob.prepareInterstitial({
                    adId: admobid.interstitial,
                    autoShow: false
                });
            }
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
