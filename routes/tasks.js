const express = require('express');
const router = express.Router();

const tasks = [{ id: 1, title: 'finish homework', createdAt: 'Wed May 01 2023 09:44:18 GMT+0200 (Central European Summer Time)', finishedAt: 'Wed May 02 2023 09:44:18 GMT+0200 (Central European Summer Time)' }, { id: 2, title: 'do the dishes', createdAt: 'Wed May 16 2023 09:44:18 GMT+0200 (Central European Summer Time)', finishedAt: '' }];
let highestId = 2;

function verifyLogin (req) {
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.session.email) && req.session.password === 'm295') {
        return true;
    } else {
        return false;
    };
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (verifyLogin(req)) {
        res.json(tasks);
    } else {
        res.status(403).json('you need to log in to do this');
    };
});

router.post('/', function (req, res, next) {
    if (verifyLogin(req)) {
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
            res.status(400).json('no title exists');
        };
        res.status(201).json(task);
    } else {
        res.status(403).json('you need to log in to do this');
    };
});

router.get('/:id', function (req, res, next) {
    if (verifyLogin(req)) {
        let taskInfos = '';
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id.toString() === req.params.id) {
                taskInfos = tasks[i];
            }
        };
        if (taskInfos === '') {
            res.sendStatus(404).json('id doesnt exist');
        } else {
            res.json(taskInfos);
        };
    } else {
        res.status(403).json('you need to log in to do this');
    };
});

router.put('/:id', function (req, res, next) {
    if (verifyLogin(req)) {
        let taskToUpdate = '';
        const { title, finishedAt } = req.body;
        if (title && finishedAt) {
            if (req.params.id) {
                res.status(404).json('id doesnt exist');
            } else {
                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i].id.toString() === req.params.id) {
                        taskToUpdate = tasks[i];
                    }
                }

                const index = tasks.indexOf(taskToUpdate);

                tasks[index].title = title;
                tasks[index].finishedAt = finishedAt;
                res.status(200).json(tasks[index]);
            };
        } else {
            res.status(406).json('missing parameters');
        };
    } else {
        res.status(403).json('you need to log in to do this');
    };
});

router.delete('/:id', function (req, res, next) {
    if (verifyLogin(req)) {
        let taskToDelete = '';
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id.toString() === req.params.id) {
                taskToDelete = tasks[i];
            }
        }

        const index = tasks.indexOf(taskToDelete);
        if (index > -1) {
            tasks.splice(index, 1);
        }

        if (taskToDelete === '') {
            res.status(404).send('id doesnt exist');
        } else {
            res.status(200).json(taskToDelete);
        };
    } else {
        res.status(403).json('you need to log in to do this');
    };
});

module.exports = router;
