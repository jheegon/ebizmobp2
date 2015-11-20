//conference main 모듈에 직접등록(별도 파일로 관리)
angular.module('conference')

.controller('LoginCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService) {
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('app.home', {}, {reload: true});

      //console.log(data.username);
      //$rootScope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
});
