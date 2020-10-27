
exports.sendMessage  = function (body) {
    axios({
        method: 'post',
        url: 'http://kr8tif.lawaapp.com:1338/api',
        data: {
            "dnis": body.dnis,
            "message": body.message
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
};

exports.getMessageStatus = function (messageId) {
    axios.get(`http://kr8tif.lawaapp.com:1338/apii?messageId=${messageId}`)
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
};