angular.module('starter.controllers', ['nvd3'])

    .controller('DashCtrl', function ($scope) { })

    .controller('CalculateCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('CalculateCtrl',['$scope', function ($scope) {
        $scope.Calculate = function (minpaycc1, minpaycc2, minpaycl, extracash, roicc1, roicc2, roicl,minAmtCC1,minAmtCC2,minAmtcl) {


            totalMinPayment = minpaycc1 + minpaycc2 + minpaycl;
            if (totalMinPayment > extracash) {
                alert("You Dont Have Sufficient Cash");
            }
            else {
                remaining = extracash - totalMinPayment;
                if (roicc1 >= roicc2 && roicc1 >= roicl) {
                    $scope.minAmtCC1= remaining + minpaycc1;
                    $scope.minAmtCC2 = minpaycc2;
                    $scope.minAmtcl = minpaycl;
                }

                else if (roicc2 >= roicc1 && roicc2 >= roicl) {
                    $scope.minAmtCC2= remaining + minpaycc2;
                    $scope.minAmtCC1 = minAmtCC1;
                    $scope.minAmtcl = minAmtcl;
                }

                else {
                    $scope.minAmtcl = remaining + minpaycl;
                    $scope.minAmtCC1 = minAmtCC1;
                    $scope.minAmtCC2 = minAmtCC2;
                }
            }


        }
    }])

    .controller('GraphCtrl', function ($scope, $stateParams, $http) {
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function (d) {
                    return d.province;
                },
                y: function (d) {
                    return d.transfer;
                },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
        var sUrl = "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";

        $http.get(sUrl).then(function (oData) {
            var aKeys = Object.keys(oData.data.gtf);
            $scope.data = new Array();
            for (var n = 0; n < aKeys.length; n++) {
                if (oData.data.gtf[aKeys[n]].hasOwnProperty("total")) {
                    $scope.data.push({ "province": aKeys[n], "transfer": oData.data.gtf[aKeys[n]].total });
                }
            }

        });


    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
