const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.redirect('/authentication/login');
});

router.post('/login', function (req, res, next) {
    if (req.body.email === 'test@gmail.com' && req.body.password === '123456') {
        req.session.email = (req.body.email);
        req.session.password = (req.body.password);
        res.sendStatus(201);
    } else {
        res.sendStatus(401);
    };
});

module.exports = router;
