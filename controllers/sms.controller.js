
exports.getMessageStatus = function (messageId) {
    axios.get(`http://kr8tif.lawaapp.com:1338/api?messageId=${messageId}`)
        .then(function (response) {
            if (response.status === 'DELIVRD') {
                console.log('Message Delivered at : ', response.delivery_time);
            } else {
                // Resend Message
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};
