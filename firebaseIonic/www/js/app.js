'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
// setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/tabs.html'
      })
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
    .state('tab.home', {
      url: '/home',
      views: {
        'home': {
          templateUrl: 'views/home/home.html',
          controller: 'homeController'
        }
      }
    })
    .state('tab.profile', {
      url: '/profile',
      views: {
        'profile': {
          templateUrl: 'views/profile/profile.html',
          controller: 'profileController'
        }
    }})
    ;
$urlRouterProvider.otherwise("/login");
})

.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])

// Changue this for your Firebase App URL.
.constant('FURL', {
    apiKey: "AIzaSyABuEPq5zUUn1eMHf7RiOZy1ySmb4_9dWQ",
    authDomain: "backend1-e6024.firebaseapp.com",
    databaseURL: "https://backend1-e6024.firebaseio.com",
    storageBucket: "backend1-e6024.appspot.com",
  }
  )
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function(FURL) {

    
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
                console.log("admobid" + angular.toJson(admobid));

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
});
