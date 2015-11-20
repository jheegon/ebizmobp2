angular.module('conference', ['ionic', 'ngMockE2E',            //'conference.home', 
                                       'conference.salary',      'conference.barcode',
                                       'conference.monthlyduty', 'conference.dailyduty',
                                       'conference.config',      'conference.authModule',
                                       'conference.AuthService', 'conference.nfc'
                                       ])

    .run(function ($ionicPlatform, $rootScope, $ionicPopup) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        // Disable BACK button on home
        $ionicPlatform.registerBackButtonAction(function(event) {
            if (true) { // your check here
                $ionicPopup.confirm({
                    title: '종료확인',
                    template: '프로그램을 종료하시겠습니까?'
                }).then(function(res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    }
                })
            }
          }, 100);


        $rootScope.loginUser    = {}; //userid, username, 현재 로그인한 사용자 정보
        $rootScope.settingData  = {}; //searchYear, searchMonth, startYear


    })
    /*.config(function ($locationProvider) {
        if (window.history && history.pushState) {
            $locationProvider.html5Mode(true);
        }
    })*/
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'AppCtrl'
            })
            .state('app.setting', {
                url: "/setting",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/setting.html",
                        controller: "AppCtrl"
                    }
                }
            })
            .state('app.about', {
                url: "/about",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/about.html",
                        controller: "AppCtrl"
                    }
                }
            })
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })
            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/home.html",
                        controller: "AppCtrl"
                    }
                }
            })
        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    })

    .controller('AppCtrl', function ($scope, $rootScope, $state, $ionicModal, $timeout, $ionicPopup, $http,
                                     $ionicSideMenuDelegate, AuthService, AUTH_EVENTS){

        var now = new Date();

        //정의되지 않은 경우에만 초기화시킨다
      //if(!angular.isDefined($scope.settingData.startYear)){
        if($scope.settingData.startYear == undefined){

            $scope.formData     = {};
            $scope.loginUser    = {}; //userid, username, 현재 로그인한 사용자 정보
            $scope.loginData    = {}; //userid, pwd, login.html에서 사용
            $scope.employeeData = [];
            $scope.settingData  = {}; //searchYear, searchMonth, startYear

            $scope.formData.startYear   = $scope.settingData.startYear   = now.getFullYear()-10;
            $scope.formData.searchYear  = $scope.settingData.searchYear  = now.getFullYear();
            $scope.formData.searchMonth = $scope.settingData.searchMonth = now.getMonth()+1;
            $scope.formData.searchDate  = $scope.settingData.searchDate  = now.getDate();
            $scope.formData.agreed      = $scope.settingData.agreed      = true;

            $rootScope.settingData.startYear   = $scope.settingData.startYear;
            $rootScope.settingData.searchYear  = $scope.settingData.searchYear;
            if(String($scope.settingData.searchMonth).length == 1){
                $rootScope.settingData.searchMonth = "0" + $scope.settingData.searchMonth; 
            } 
            if(String($scope.settingData.searchDate).length == 1){
                $rootScope.settingData.searchDate = "0" + $scope.settingData.searchDate; 
            } 
        }

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
            var alertPopup = $ionicPopup.alert({
                title: 'Unauthorized!',
                template: 'You are not allowed to access this resource.'
            });
        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            AuthService.logout();
            $state.go('login');
            var alertPopup = $ionicPopup.alert({
              title: 'Session Lost!',
              template: 'Sorry, You have to login again.'
            });
        });

        //###################################################
        // 환경설정 관련
        //###################################################
        $ionicModal.fromTemplateUrl('templates/setting_modal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.settingModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeSettingModal = function () {
            $scope.settingModal.hide();
        },

        // Open the login modal
        $scope.showSettingModal = function () {
            $scope.settingModal.show();
        };

        $scope.setting = function(formData){

            $scope.settingData.startYear   = formData.startYear;
            $scope.settingData.searchYear  = formData.searchYear;
            $scope.settingData.searchMonth = formData.searchMonth;
            $scope.settingData.searchDate  = formData.searchDate;
            $scope.settingData.agreed      = formData.agreed;

            $rootScope.settingData.startYear   = $scope.settingData.startYear;
            $rootScope.settingData.searchYear  = $scope.settingData.searchYear;
            if(String($scope.settingData.searchMonth).length == 1){
                $rootScope.settingData.searchMonth = "0" + $scope.settingData.searchMonth; 
            } 
            if(String($scope.settingData.searchDate).length == 1){
                $rootScope.settingData.searchDate = "0" + $scope.settingData.searchDate; 
            }

            $scope.closeSettingModal();
            $state.go('app.home', {}, {reload: true});
        };

        //###################################################
        // 로그인
        //###################################################
        $scope.login = function(loginData) {

          //로그인되어 있는 상태면  home으로 이동
          if($scope.loginUser.userid != null){
              $state.go('app.home', {}, {reload: true});
              return;
          }

          if(!angular.isDefined(loginData.userid)){

            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'ID를 입력하세요.'
            });
            return;
          };
          if(!angular.isDefined(loginData.pwd)){

            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: '비밀번호를 입력하세요.'
            });
            return;
          };
          
          //정상실행됨
          $http.get("data/employee.json").success(function(loadData){

            $scope.employeeData = loadData;

            for(var i=0;i<$scope.employeeData.length;i++){

                //console.log($scope.employeeData[i].empno);
                //console.log($scope.employeeData[i].empname);

                if($scope.employeeData[i].empno == loginData.userid){

                    AuthService.storeUserCredentials(loginData.userid + '.yourServerToken');
                    $scope.loginUser.userid     = AuthService.userid();
                    $rootScope.loginUser.userid = $scope.loginUser.userid;

                  //console.log("userid:::" + $scope.loginUser.userid);
                  //console.log("$rootScope.loginUser:::" + $rootScope.loginUser.userid);

                    $state.go('app.home', {}, {reload: true});
                    return;
                }
            }
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
            });
          });

          //서비스를 이용한 코드, 나중에 이런 코드로 변경해야 함
          /*AuthService.login(loginData.userid, data.pwd).then(function(authenticated) {
            $state.go('app.home', {}, {reload: true});
            $scope.setCurrentUserId(loginData.userid);
          }, function(err) {
            console.log(err);
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
            });
          });*/

        };

        //###################################################
        // 로그아웃
        //###################################################
        $scope.logout = function(){

          console.log('Logout..........');

          AuthService.logout();
          $state.go('login');
        };

        $scope.performValidRequest = function() {
            $http.get('http://localhost:8100/valid').then(
              function(result) {
                $scope.response = result;
              });
        };

        $scope.performUnauthorizedRequest = function() {
            $http.get('http://localhost:8100/notauthorized').then(
              function(result) {
                // No result here..
              }, function(err) {
                $scope.response = err;
              });
        };

        $scope.performInvalidRequest = function() {
            $http.get('http://localhost:8100/notauthenticated').then(
              function(result) {
                // No result here..
              }, function(err) {
                $scope.response = err;
              });
        };


        /*
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        },

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Login', $scope.loginData);
            alert("Only the Facebook login is implemented in this sample app.");
            $scope.closeLogin();
        };

        $scope.fbLogin = function () {
            openFB.login(
                function (response) {
                    if (response.status === 'connected') {
                        console.log('Facebook login succeeded');
                        $scope.closeLogin();
                    } else {
                        alert('Facebook login failed');
                    }
                },
                {scope: 'email,publish_actions'});
        }
        */
    })
;
