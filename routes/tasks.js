const express = require('express');
const router = express.Router();

const tasks = [{ id: 1, title: 'finish homework', createdAt: 'Wed May 01 2023 09:44:18 GMT+0200 (Central European Summer Time)', finishedAt: 'Wed May 02 2023 09:44:18 GMT+0200 (Central European Summer Time)' }, { id: 2, title: 'do the dishes', createdAt: 'Wed May 16 2023 09:44:18 GMT+0200 (Central European Summer Time)', finishedAt: '' }];
let highestId = 2;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json(tasks);
});

router.post('/', function (req, res, next) {
    const { title } = req.body;
    highestId++;
    const id = highestId;
    const createdAt = Date();
    const finishedAt = '';

    let task = {};
    if (title) {
        task = {
            id,
            title,
            createdAt,
            finishedAt
        };
        tasks.push(task);
    } else {
        res.status(400).send('no title exists');
    };
    res.status(201).json(task);
});

router.get('/:id', function (req, res, next) {
    let taskInfos = '';
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id.toString() === req.params.id) {
            taskInfos = tasks[i];
        }
    };
    if (taskInfos === '') {
        res.sendStatus(404);
    } else {
        res.json(taskInfos);
    };
});

module.exports = router;
