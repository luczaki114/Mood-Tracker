moodTracker.service('MoodRecordService', function () {
    function currentDate () {
        var date = new Date;
        return date.toJSON();
    }

    function cleanRecord () {
        moodRecord.feelings = moodRecord.feelings.filter(function(ele) {
            if (ele.beenModifed === true) {
                delete ele.beenModifed;
                delete ele.$$hashKey;
                return true;
            } else {
                return false;
            }
        });
        moodRecord.triggers = moodRecord.triggers.filter(function (ele) {
            if (ele.checked === true) {
                delete ele.checked;
                delete ele.$$hashKey;
                return true;
            } else {
                return false;
            }
        })
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
                intensity: 5,
                beenModifed: false
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
        cleanRecord();
        var myJSON = JSON.stringify(moodRecord);

        var request = new XMLHttpRequest();
        request.open('POST', '/api/moodrecords', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(myJSON);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var response = request.responseText;
                console.log("record has been sent", response);      
            } else {
                // We reached our target server, but it returned an error
            }
        };      
    };

    this.addfeelingToFeelings = function (feelingToAddName) {
        // send to server
    };

    this.addTriggerToTriggers = function (triggerToAdd) {
        // send to server
    };
});
