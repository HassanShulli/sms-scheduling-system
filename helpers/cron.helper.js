const CronJob = require('cron').CronJob;
const formatDate = require('./date.helper');

function cronGenerator(time, message, list) {
    let formattedTime = formatDate(time);
    let cronTime = `${formattedTime.minute} ${formattedTime.hour} * * *`;
    console.log('time  : ', time);
    console.log('message  : ', message);
    console.log('list  : ', list);
    console.log('cronTime  : ', cronTime);
    new CronJob(cronTime, function () {
        console.log('You will see this message every 10 second');

        axios.get('http://localhost:3000/api/v1/schedule')
            .then(function (response) {
                // handle success
                console.log('-----');
                console.log('get api schedule response : ', response.data);
                console.log('-----');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

    }, null, true, 'America/Los_Angeles');
}

module.exports = cronGenerator;