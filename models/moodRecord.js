var mongoose = require('mongoose');

var feelingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    intensity: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    }
});

var triggerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

var moodRecordSchema = mongoose.Schema({
    feelings: [feelingSchema],
    triggers: [triggerSchema],
    create_date: {
        type: Date,
        default: Date.now
    } 
});

var MoodRecord = module.exports = mongoose.model('MoodRecord', moodRecordSchema);
