var express = require('express');
var router = express.Router();

MoodRecord = require('../models/moodRecord');

/* GET all mood records */
router.get('/', function(req, res, next) {
  MoodRecord.find(function (err, moodrecord) {
    if(err) {
      throw err;
    }
    res.json(moodrecord);
  })
});

/* GET one mood record */
router.get('/:__id', function(req, res) {
  MoodRecord.findById(req.params.__id, function (err, moodRecord) {
        if (err) {
            throw err;
        }
        res.json(moodRecord)
    });
})

/* POST new mood record */
router.post('/', function(req, res) {
  var moodRecord = req.body;
  MoodRecord.create(moodRecord, function(err, moodRecord) {
    if (err) {
        throw err;
    } 
    res.json(moodRecord);
  });
});

// PUT/PATCH an update to an existing mood record
// I put this in, but I won't really be using it. 
// Theres no need to update a mood record once it's been submitted.
// Also, I'm using embedded docuements for feelings and triggers,
// so if I were to update a record I would need to first carefully recreate the new arrays
// with all the other unchanged fields and with the new updated fields.
// Storing triggers and feelings as seperate collections would be overkill. 
router.put('/:__id', function(req, res) {
	MoodRecord.findByIdAndUpdate(req.params.__id, req.body, function(err, moodRecord) {
		if (err) {
      throw err;
    } 
		res.json(moodRecord);
	});
});

router.delete('/:__id', function (req, res) {
	MoodRecord.findByIdAndRemove(req.params.__id, function(err, moodRecord) {
		if (err) {
      throw err;
    } 
		res.json(moodRecord);
	});
});

module.exports = router;
