const express = require('express');
var router = express.Router();
const db = require('../config/database');

router.get('/getAllPosts', (req, res, next) => {
    db.query('SELECT * FROM posts')
    .then(([results, fields]) => {
        console.log(results);
        return db.query('SELECT * FROM posts WHERE id=2');
    })
    .then(([results, fields]) => {
        console.log(results);
        res.send(results)
    })
})

module.exports = router;