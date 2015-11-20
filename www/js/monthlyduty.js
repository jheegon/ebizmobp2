angular.module('conference.monthlyduty', ['ngResource', 'conference.config'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.monthlyduty', {
                url: "/monthlyduty/:month",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/monthlyduty.html",
                        controller: "MonthlydutyCtrl"
                    }
                }
            })

    })

    /*.factory('Monthlyduty', function ($resource, SERVER_PATH) {
        //return $resource(SERVER_PATH + '/monthlyduty/:month');
        
        var monthlydutys = [
              { bizcd:'1051', pay_month:'201506', dept_cd:'0502020', empno:'105000049', empname:'홍길동', class_nm:'사원(현장직)', dept_nm:'금형팀 > 금형라인', pay_version_id:'201506020', time_nor_time:160, time_ot1_time:44.55, time_ot2_time:0, time_night_time:0, time_week1_time:24, time_week2_time:0, time_paid1_time:72, time_paid2_time:3.3, time_allowed_time:0  }, 
              { bizcd:'1051', pay_month:'201506', dept_cd:'0501020', empno:'105000057', empname:'김길동', class_nm:'사원(현장직)', dept_nm:'생산팀 > 가공라인', pay_version_id:'201506020', time_nor_time:151.2, time_ot1_time:56.7, time_ot2_time:0, time_night_time:0, time_week1_time:0, time_week2_time:0, time_paid1_time:80, time_paid2_time:4.2, time_allowed_time:0  }, 
              { bizcd:'1051', pay_month:'201506', dept_cd:'0502010', empno:'105000058', empname:'최길동', class_nm:'반장', dept_nm:'자동화팀 > 자동화라인', pay_version_id:'201506020', time_nor_time:168, time_ot1_time:60.75, time_ot2_time:0, time_night_time:0, time_week1_time:24, time_week2_time:0, time_paid1_time:72, time_paid2_time:4.5, time_allowed_time:0  }
            ];

        return { 
            findByMonth : function (month, empno) {
            
                for(var i = 0; i < monthlydutys.length -1; i++){
                    if(monthlydutys[i].pay_month === month && monthlydutys[i].empno === empno){
                        //console.log(monthlydutys[i]);
                        return monthlydutys[i];
                    }
                }
            }
        }
    })*/

    
    .controller('MonthlydutyCtrl', function ($scope, $rootScope, $http, $stateParams){
        /*$scope.serverPath = SERVER_PATH;
        //$scope.monthlyduty = Monthlyduty.get({month: $stateParams.month});
        $scope.monthlyduty = Monthlyduty.findByMonth($stateParams.month, EMPNO);*/


        $scope.monthlyDutys = [];
        $scope.monthlyDuty  = [];

        var searchEmpNo = $rootScope.loginUser.userid;
        var searchMonth = String($rootScope.settingData.searchYear) +
                          String($rootScope.settingData.searchMonth);

        console.log("searchEmpNo:::" + searchEmpNo);
        console.log("$rootScope.settingData.searchYear:::" + $rootScope.settingData.searchYear);
        console.log("searchMonth:::" + searchMonth);

        $scope.findData = function(month, empno){

            var loadData = [];

            $http.get("data/monthlyduty.json").success(function(data){

                $scope.monthlyDutys = data;

                console.log("$scope.monthlyDutys.length:::" + $scope.monthlyDutys.length);

                for(var i = 0; i < $scope.monthlyDutys.length; i++){
                    if($scope.monthlyDutys[i].pay_month == month && $scope.monthlyDutys[i].empno == empno){
                        $scope.monthlyDuty = $scope.monthlyDutys[i];
                    }
                }
            });
        };
        $scope.findData(searchMonth, searchEmpNo);


    });