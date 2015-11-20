angular.module('conference.nfc', ['ngResource', 'ngCordova.plugins.nfc', 'conference.config'])

// Routes
.config(function($stateProvider) {

        $stateProvider

            .state('app.nfc', {
            url: "/nfc",
            views: {
                'menuContent': {
                    templateUrl: "templates/nfc.html",
                    controller: "NfcCtrl"
                }
            }
        })

    })
    .controller('NfcCtrl', function($scope, $stateParams, SERVER_PATH, EMPNO, $cordovaNfc, $cordovaNfcUtil) {
        $scope.serverPath = SERVER_PATH;
        

        $cordovaNfc.then(function(nfcInstance) {

            //Use the plugins interface as you go, in a more "angular" way
            nfcInstance.addNdefListener(addNfc)
                .then(
                    //Success callback
                    function(event) {

                        console.log("bound success");
                    },
                    //Fail callback
                    function(err) {
                        alert("error");
                        console.log("error");
                    });
        });

        $cordovaNfcUtil.then(function(nfcUtil) {
            
            console.log(nfcUtil.bytesToString("some bytes"))
        });
        
        var nfcList = [];

        var addNfc = function(event) {
            
            var tag = event.tag,
                ndefMessage = tag.ndefMessage;

            // dump the raw json of the message
            // note: real code will need to decode
            // the payload from each record
            //alert(JSON.stringify(ndefMessage));

            // assuming the first record in the message has 
            // a payload that can be converted to a string.
            alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));

            nfcList.push({
                text: JSON.stringify(ndefMessage),
                format: nfc.bytesToString(ndefMessage[0].payload).substring(3)
            });

            $scope.nfcs = nfcList;
        };

    });
