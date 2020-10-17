const mongoose = require('mongoose');

module.exports = mongoose.model('Schedule', new mongoose.Schema({
        sendTime: {
            type: String,
            required: true
        },
        recipient: [{
            type: String,
            required: true
        }],
        message: {
            type: String,
            required: true
        }
    }, {timestamps: true}
));