const Schedule = require('../models/schedule.model');

exports.create = function (req, res) {

    const newSchedule = new Schedule({
        sendTime: req.body.sendTime,
        recipient: req.body.recipient,
        message: req.body.message
    });

    newSchedule.save(function (err, schedule) {
        if (err) {
            res.json({success: false, result: [], messages: [err.message]});
        } else {
            res.json({success: true, result: schedule, messages: []});
        }
    });
};

exports.read = function (req, res) {
    Schedule.find({},
        function (err, schedules) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: schedules, messages: []});
            }
        }
    )
};

exports.readToday = function (req, res) {
    let today = new Date();
    let startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let startOfTomorrow = (today.getDate() + 1);

    Schedule.find({"sendTime" : {"$gte": startOfToday, "$lt": startOfTomorrow}},
        function (err, schedules) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                console.log('schedules : ', schedules);
                res.json({success: true, result: schedules, messages: []});
            }
        }
    )
};

exports.update = function (req, res) {
    const updatedSchedule = new Schedule({
        sendTime: req.body.sendTime,
        recipient: req.body.recipient,
        date: req.body.date
    });

    Schedule.update({"_id": req.body._id}, {$set: updatedSchedule},
        function (err, schedules) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: schedules, messages: []});
            }
        }
    )
};

exports.delete = function (req, res) {
    Schedule.remove({"_id": req.params.id},
        function (err, schedule) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: schedule, messages: []});
            }
        }
    )
};