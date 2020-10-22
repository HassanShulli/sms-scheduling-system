const express = require('express');
const router = express.Router();

var app = express();

const scheduleCtrl = require('../controllers/schedule.controller');

router.post('/schedule', scheduleCtrl.create);
router.get('/schedule', scheduleCtrl.read);
router.get('/schedule/today', scheduleCtrl.readToday);
router.put('/schedule', scheduleCtrl.update);
router.delete('/schedule', scheduleCtrl.delete);