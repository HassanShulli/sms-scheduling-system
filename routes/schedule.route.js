const express = require('express');
const router = express.Router();

var app = express();

const scheduleCtrl = require('../controllers/schedule.controller');

router.get('/schedule', scheduleCtrl.read);
router.post('/schedule', scheduleCtrl.create);