angular.module('conference.salary', ['ngResource', 'conference.config'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.salary', {
                url: "/salary/:month",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/salary.html",
                        controller: "SalaryCtrl"
                    }
                }
            })

    })

    /*.factory('Salary', function ($resource, SERVER_PATH) {
        //return $resource(SERVER_PATH + '/salary/:month');
        var salarys = [
            { empno:'105000049', empname:'홍길동', pay_month:'201509', total_income:3087116, total_deduct:545482, net_income:2541634, pay_base:1625600, allow_ot1_time:452628, allow_ot2_time:0, allow_paid1_time:731520, allow_night_time:0, allow_paid2_time:33528, allow_week1_time:243840, allow_week2_time:0, last_balance_income:0, user_defined_income:0, tax_income:107250, tax_residence:10720, nation_pension:183600, fee_medical_insurance:176900, fee_hire_insurance:20066, fee_meail:0, fee_informal_group:25000, fee_mutual_aid:0, fee_union:21946, user_defined_deduct:0  }, 
            { empno:'105000057', empname:'김길동', pay_month:'201509', total_income:3087116, total_deduct:545482, net_income:2541634, pay_base:1625600, allow_ot1_time:452628, allow_ot2_time:0, allow_paid1_time:731520, allow_night_time:0, allow_paid2_time:33528, allow_week1_time:243840, allow_week2_time:0, last_balance_income:0, user_defined_income:0, tax_income:107250, tax_residence:10720, nation_pension:183600, fee_medical_insurance:176900, fee_hire_insurance:20066, fee_meail:0, fee_informal_group:25000, fee_mutual_aid:0, fee_union:21946, user_defined_deduct:0  }, 
            { empno:'105000058', empname:'최길동', pay_month:'201509', total_income:3087116, total_deduct:545482, net_income:2541634, pay_base:1625600, allow_ot1_time:452628, allow_ot2_time:0, allow_paid1_time:731520, allow_night_time:0, allow_paid2_time:33528, allow_week1_time:243840, allow_week2_time:0, last_balance_income:0, user_defined_income:0, tax_income:107250, tax_residence:10720, nation_pension:183600, fee_medical_insurance:176900, fee_hire_insurance:20066, fee_meail:0, fee_informal_group:25000, fee_mutual_aid:0, fee_union:21946, user_defined_deduct:0  } 
        ];
        var bonuses = [
                      { empno:'105000049', empname:'홍길동', bonus_month:'201509', bonus_name:'2015년 9월 추석선물비', bonus_amount:300000  }, 
                      { empno:'105000049', empname:'홍길동', bonus_month:'201509', bonus_name:'2015년 생산 9월 정기상여 (안산)', bonus_amount:1252800  }, 
                      { empno:'105000049', empname:'홍길동', bonus_month:'201509', bonus_name:'2015년 생산 9월 추석 2차 상여 (안산)', bonus_amount:1252800  }, 
                      { empno:'105000057', empname:'김길동', bonus_month:'201509', bonus_name:'2015년 9월 추석선물비', bonus_amount:300000  }, 
                      { empno:'105000058', empname:'최길동', bonus_month:'201509', bonus_name:'2015년 생산 9월 정기상여 (안산)', bonus_amount:1230000  }, 
                      { empno:'105000058', empname:'최길동', bonus_month:'201509', bonus_name:'2015년 생산 9월 추석 2차 상여 (안산)', bonus_amount:1230000  }, 
                      { empno:'105000058', empname:'최길동', bonus_month:'201509', bonus_name:'2015년 9월 추석선물비', bonus_amount:300000  }
                ];
           
        return { 
            
            findSalaryByMonth : function (month, empno) {
            
                for(var i = 0; i < salarys.length -1; i++){
                    if(salarys[i].pay_month === month && salarys[i].empno === empno){
                        //console.log(salarys[i]);
                        return salarys[i];
                    }
                }
            },
            
            findBonusByMonth : function (month, empno) {
                
                var my_bonuses = [];
                 console.log("findBonusByMonth" + bonuses.length);       
                for(var i = 0; i < bonuses.length -1; i++){
                    if(bonuses[i].bonus_month === month && bonuses[i].empno === empno){
                        console.log(bonuses[i]);
                        my_bonuses.push(bonuses[i]);
                    }
                }
                return my_bonuses;
            }
        }
    })*/

    
    .controller('SalaryCtrl', function ($scope, $rootScope, $http, $stateParams) {
        /*$scope.serverPath = SERVER_PATH;
        //$scope.salary = Salary.get({month: $stateParams.month});
        $scope.salary = Salary.findSalaryByMonth($stateParams.month, EMPNO);
        $scope.month = $stateParams.month;
        $scope.my_bonuses = Salary.findBonusByMonth($stateParams.month, EMPNO);*/


        $scope.salaryData = [];
        $scope.salary     = [];

        $scope.bonusData  = [];
        $scope.bonus      = [];

        var searchEmpNo = $rootScope.loginUser.userid;
        var searchMonth = String($rootScope.settingData.searchYear) +
                          String($rootScope.settingData.searchMonth);

        console.log("searchEmpNo:::" + searchEmpNo);
        console.log("$rootScope.settingData.searchYear:::" + $rootScope.settingData.searchYear);
        console.log("searchMonth:::" + searchMonth);

        $scope.findSalaryData = function(month, empno){

            var loadData = [];

            $http.get("data/salary.json").success(function(data){

                $scope.salaryData = data;

                console.log("$scope.salaryData.length:::" + $scope.salaryData.length);

                for(var i = 0; i < $scope.salaryData.length; i++){
                    if($scope.salaryData[i].pay_month == month && $scope.salaryData[i].empno == empno){
                        $scope.salary = $scope.salaryData[i];
                    }
                }
            });
        };

        $scope.findBonusData = function(month, empno){

            var loadData = [];

            $http.get("data/bonus.json").success(function(data){

                $scope.bonusData = data;

                console.log("$scope.bonusData.length:::" + $scope.bonusData.length);

                for(var i = 0; i < $scope.bonusData.length; i++){
                    if($scope.bonusData[i].bonus_month == month && $scope.bonusData[i].empno == empno){
                        $scope.bonus.push($scope.bonusData[i]);

                        console.log("$scope.bonus.empname:::" + $scope.bonus.empname);


                    }
                }
            });
        };

        $scope.findSalaryData(searchMonth, searchEmpNo);
        $scope.findBonusData(searchMonth, searchEmpNo);
    });