angular.module('conference.dailyduty', ['ngResource', 'conference.config'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider
        .state('app.dailyduty', {
            url: "/dailyduty/:day",
            views: {
                'menuContent' :{
                    templateUrl: "templates/dailyduty.html",
                    controller: "DailydutyCtrl"
                }
            }
        })
    })


    .factory('Dailyduty', function ($resource, $http) {

        //return $resource(SERVER_PATH + '/dailyduty/:day');
        var dailydutys = [];

        return { 
            findByDay: function(day, empno){

                return $http.get("data/dailyduty.json").then(function(data){

                    dailydutys = data;

                    for(var i = 0; i < dailydutys.length; i++){
                        if(dailydutys[i].workdt == day && dailydutys[i].empno == empno){
                            return dailydutys[i];
                        }
                    }
                });
            }
        }
    })

    .controller('DailydutyCtrl', function ($scope, $rootScope, $stateParams, $http, Dailyduty, SERVER_PATH) {

        //service를 이용한 처리
        /*$scope.dailyduty = [];
        Dailyduty.findByDay($stateParams.day, EMPNO).then(function(data){
            $scope.dailyduty = data;
        });*/

        $scope.dailydutys = [];
        $scope.dailyduty  = [];

        var searchEmpNo = $rootScope.loginUser.userid;
        var searchDate  = $rootScope.settingData.searchYear  + "-" + 
                          $rootScope.settingData.searchMonth + "-" +
                          $rootScope.settingData.searchDate;

        console.log("searchEmpNo:::" + searchEmpNo);
        console.log("searchDate:::" + searchDate);

        $scope.findData = function(day, empno){

            var loadData = [];

            $http.get("data/dailyduty.json").success(function(data){

                $scope.dailydutys = data;

                console.log("$scope.dailydutys.length:::" + $scope.dailydutys.length);

                for(var i = 0; i < $scope.dailydutys.length; i++){
                    if($scope.dailydutys[i].workdt == day && $scope.dailydutys[i].empno == empno){
                        $scope.dailyduty = $scope.dailydutys[i];
                    }
                }
            });
        };
        $scope.findData(searchDate, searchEmpNo);
        
        /*$scope.findData(searchDate, searchEmpNo).then(function(data){
            $scope.dailyduty = data;
        });*/
    })
;

