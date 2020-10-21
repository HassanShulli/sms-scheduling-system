function formatDate(date) {
    let dateArr = date.split('T');
    dateArr = dateArr[1].split(':');
    console.log('dateArr : ', dateArr);
    return {hour: dateArr[0], minute: dateArr[1]};
    // return
//'2020-10-18T19:20:30+01:00',
}

module.exports = formatDate;