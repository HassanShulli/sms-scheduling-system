const CronJob = require('cron').CronJob;
const formatDate = require('./date.helper');
const smsController = require('../controllers/sms.controller');

function cronGenerator(time, message, list) {
    let formattedTime = formatDate(time);
    let cronTime = `${formattedTime.minute} ${formattedTime.hour} * * *`;
    new CronJob(cronTime, function () {
        smsController.sendMessage()
            .then(res => {
                let resendMessages = [];
                res.forEach(message => {
                    smsController.getMessageStatus(res.message_id)
                        .then(res => {
                            if (res.status === 'DELIVRD') {
                                console.log('MessageSent');
                            } else {
                                resendMessages.push(res);
                            }
                        })
                })

                if (resendMessages.length > 0) {
                    console.log('resend undelivered Messages');
                }
            })
    }, null, true, 'America/Los_Angeles');
}

module.exports = cronGenerator;