const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.redirect('/authentication/login');
});

router.post('/login', function (req, res, next) {
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.email) && req.body.password === 'm295') {
        req.session.email = (req.body.email);
        req.session.password = (req.body.password);
        res.status(201).json('login was successful');
    } else {
        res.status(401).json('wrong email or password');
    };
});

router.get('/verify', function (req, res, next) {
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.session.email) && req.session.password === 'm295') {
        res.status(200).json('you are logged in');
    } else {
        res.status(401).json('you are not logged in');
    };
});

router.delete('/logout', function (req, res, next) {
    req.session.destroy();
    res.sendStatus(204);
});

module.exports = router;
