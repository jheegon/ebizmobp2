angular.module('conference.barcode', ['ngResource', 'ngCordova', 'conference.config'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.barcode', {
                url: "/barcode",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/barcode.html",
                        controller: "BarcodeCtrl"
                    }
                }
            })

    })
    .controller('BarcodeCtrl', function ($scope, $stateParams, SERVER_PATH, EMPNO, $cordovaBarcodeScanner) {
        $scope.serverPath = SERVER_PATH;
        var barcodeList = [];
        $scope.addBarcode = function() {
         
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                if(!imageData.cancelled){
                    barcodeList.push({text : imageData.text, format: imageData.format });
                    console.log("addBarcode -> " + imageData.cancelled);
                    $scope.barcodes = barcodeList;
                }
            }, function(error) {
                console.log("An error happened addBarcode -> " + error);
            });
        };
        
    });