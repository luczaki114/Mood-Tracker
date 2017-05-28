var moodTracker = angular.module("moodTracker", []);

moodTracker.controller('moodTrackerController', function($scope, moodRecordService, logInService) {
    
    $scope.isLoggedIn = logInService.isLoggedIn();
    $scope.moodRecord = moodRecordService.getmoodRecord();
    $scope.selectedFeeling = {};

    $scope.display = function (id) {
        var panels = document.getElementsByClassName("user-story");
        var ele = document.getElementById(id);
        Array.prototype.forEach.call(panels, function(panel) {      
            if ( panel.id == id ) {
                return;
            }
            panel.style.opacity = 0;
            panel.style.zIndex = 0;
        });
        setTimeout(function () {
            ele.style.opacity = 1;
            ele.style.zIndex = 1;
        }, 400);
    }

    $scope.startRecordingMood = function () {
        $scope.display("feeling-cloud");
    }

    $scope.addFeeling = function(feelingToAdd) {
        if ($scope.isLoggedIn) {
            moodRecordService.addfeelingToFeelings(feelingToAddName)
        } else {
            $scope.moodRecord.feelings.push({
                name: feelingToAddName,
                feelingIntensity: 5,
                beenModifed: false
            });
        }
    }

    $scope.addTrigger = function(triggerToAdd) {
        if ($scope.isLoggedIn) {
            moodRecordService.addTriggerToTriggers(triggerToAdd);
        } else {
            $scope.moodRecord.triggers.push({
                name: triggerToAdd,
                checked: false
            });
        }
        
    }

    $scope.feelingSelected = function (feeling) {
        $scope.selectedFeeling = feeling;
        $scope.display('feeling-slider')
    }

    $scope.saveFeelingIntensity = function(selectedFeeling) {
        var feeling = $scope.moodRecord.feelings.find(function (ele) {
            return ele.name == selectedFeeling.name;
        });

        feeling.beenModifed = true;
        feeling.intensity = selectedFeeling.intensity;

        $scope.display("feeling-cloud");
    };

    // $scope.saveTrigger = function(trigger) {
    //     delete $scope.moodRecord.feelings[$scope.selectedFeeling];

    //     $scope.moodRecord.feelings[$scope.selectedFeeling] = {};
    //     $scope.moodRecord.feelings[$scope.selectedFeeling].beenModifed = true;
    //     $scope.moodRecord.feelings[$scope.selectedFeeling].feelingIntensity = feelingIntensity;
    //     $scope.display("feeling-cloud");
    // };

    $scope.finish = function () {
        moodRecordService.sendRecord();
        $scope.display("finish")
    }

    $scope.login = function () {
        alert("this has not been built out yet")
    }

    $scope.display("login-moodRecord");

});

moodTracker.service('moodRecordService', function () {
    function currentDate () {
        var date = new Date;
        return date.toJSON();
    }

    var moodRecord = {
        "date": currentDate(),
        "feelings": [
            {
                name: "happy",
                intensity: 5,
                beenModifed: false
            }, {
                name: "calm",
                "feelingIntensity": 5,
                "beenModifed": false
            }, {
                name: "sad",
                intensity: 5,
                beenModifed: false
            }, {
                name: "frustrating",
                intensity: 5,
                beenModifed: false
            } 
        ],
        "triggers": [
            {
                name: "smoked",
                checked:false
            }, {
                name: "meditated",
                checked:false
            }, {
                name: "ate junk food",
                checked:false
            }, {
                name: "cleaned the house",
                checked:false
            }
        ]
    };

    this.getmoodRecord = function () {
        return moodRecord;
    }; 

    this.sendRecord = function () {
        console.log(moodRecord)
        console.log("record has been sent");
    }

    this.addfeelingToFeelings = function (feelingToAddName) {
        // send to server
    };

    this.addTriggerToTriggers = function (triggerToAdd) {
        // send to server
    };
});

moodTracker.service('logInService', function () {
    this.isLoggedIn = function () {
        return false;
    }
});
