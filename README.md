# SMS Scheuling System

### Overview:
This is an implementation of an sms scheduling system that consists of a set of Restful APIs and utilizes MongoDB. The system is used to schedule and send sms messages.

### Description:
These APIs will be used to create a schedule that consists of phone numbers, a message and a time for sending that message.
A master CRON Job runs every day at midnight and gets all the schedules for that day. For each schedule a cron generator function is called, this creates a new cron sceduled to run at the time specified in the schedule and calls an external api for sending the sms message.

Another external api is called to check whether the sms message is delivered correctly. If the message is not delivered the message is resent to the recipients.

## Documentation
APIs: 

1) Create a schedule.

POST : localhost:3000/api/v1/schedule

Sample Request Body:

```javascript
{
  "sendTime": "2020-10-22T19:20:30+01:00",
  "message": "Test Message 2",
    "recipient": [
        "60112141232",
        "60112141231",
        "60112141932"
    ]
}

2) Update a schedule.

PUT : localhost:3000/api/v1/schedule

Sample Request Body:

```javascript
{
  "sendTime": "2020-10-22T19:20:30+01:00",
  "message": "Test Message 2",
    "recipient": [
        "60112141232",
        "60112141231",
        "60112141932"
    ]
}
```

3) Get all schedules.

GET : localhost:3000/api/v1/schedule

Returns all schedules in the database

4) Get today's schedules.

GET : localhost:3000/api/v1/schedule/today 

Returns all schedules with a 'sendTime' scheduled for today

5) External API for sending sms messages

POST : http://kr8tif.lawaapp.com:1338/api

Sample Request Body:

```javascript
{
    "dnis": body.dnis,
    "message": body.message
}
```

5) External API for checking sms status

GET : http://kr8tif.lawaapp.com:1338/apii?messageId=${messageId}

Params: messageId - id received in the response of the post request (5) 



## Technology / tools
- Node.js
- Express.js
- MongoDB (Mongoose framework)
- VsCode


## Author
Hassan Shulli