const express = require('express');
const router = express.Router();

const tasks = [{ id: 1, title: 'finish homework', createdAt: '2023-03-19T23:15:30.000Z', finishedAt: '2023-04-02T19:15:30.000Z' }, { id: 1, title: 'do the dishes', createdAt: '2023-05-01T06:36:30.000Z', finishedAt: '' }];

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json(tasks);
});

module.exports = router;
