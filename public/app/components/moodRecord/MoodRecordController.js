moodTracker.controller('MoodRecordController', function($scope, MoodRecordService, LoginService) {
    
    $scope.isLoggedIn = LoginService.isLoggedInDummy();
    $scope.moodRecord = MoodRecordService.getmoodRecord();
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
            MoodRecordService.addfeelingToFeelings(feelingToAddName)
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
            MoodRecordService.addTriggerToTriggers(triggerToAdd);
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
        MoodRecordService.sendRecord();
        $scope.display("finish")
    }

    $scope.login = function () {
        alert("this has not been built out yet")
    }

    $scope.display("login-moodRecord");

});