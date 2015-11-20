angular.module('conference.home', ['conference.config'])
    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/home.html",
                        controller: "HomeCtrl"
                    }
                }
            })

    })
    
    //Controllers
    .controller('HomeCtrl', function ($scope) {
        $scope.menus = [
                    {url:"/salary/201509", title:"급여 2015년09월", pic:"cash"},
                    {url:"/salary/201509", title:"상여 2015년09월", pic:"cash"},
                    {url:"/dailyduty/2015-06-01", title:"일근태 2015-06-01", pic:"clock"},
                    {url:"/dailyduty/2015-06-02", title:"일근태 2015-06-02", pic:"clock"},
                    {url:"/dailyduty/2015-06-03", title:"일근태 2015-06-03", pic:"clock"},
                    {url:"/monthlyduty/201506", title:"월근태 2015년06월", pic:"calendar"}
                ];
    });
