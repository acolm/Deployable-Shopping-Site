/*
    posts.js
    
    Description: Contains all routes that request post information from the server
*/

const e = require('express');
var express = require('express');
var router = express.Router();
const db = require("../config/database");

router.get('/search/:searchTerm/:searchCategory/:searchOrder', (req, resp, next) => {
    let searchTerm = req.params.searchTerm;
    let searchCategory = req.params.searchCategory;
    let searchOrder = req.params.searchOrder;
    
    let arguments = [];
    let _sql = 'SELECT p.id, p.title, p.price, p.thumbnail, p.created \
    FROM posts p WHERE ';
    if (searchTerm !== '__NO_VALUE__') {
        _sql += '(title LIKE ? OR class LIKE ?) AND ';
        arguments.push('%' + searchTerm + '%');
        arguments.push('%' + searchTerm + '%');
    }
    if(searchCategory !== 'All'){
        _sql += 'category = ? AND ';
        arguments.push(searchCategory);
    }
    _sql +='approved = 1 ORDER BY p.price';
    if(searchOrder === 'PriceHiToLow') {
        _sql += ' DESC';
    }
    db.query(_sql, arguments)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, resp, next) => {
    resp.sendFile("item.html", {root: "public/html"});
});

router.get('/getPostById/:id', (req, resp, next) => {
    let _id = req.params.id;
    let _sql = 'SELECT p.id, p.title, p.description, p.price, p.class, p.created, p.photopath, p.category, \
    u.firstname, u.lastname, u.profilepic \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    WHERE p.id=?;';
    db.query(_sql,_id)
    .then(([results, fields]) => {
        resp.json(results[0]);
    })
    .catch((err) => next(err));
});

router.get('/getRecentPosts/:count', (req, resp, next) => {
    let count = req.params.count;
    let _sql = 'SELECT p.id, p.title, p.price, p.created, p.thumbnail FROM posts p \
    ORDER BY p.created DESC LIMIT ';
    _sql += count;          //For some reason, this wont work unless I add onto this string
    db.query(_sql)          //Might have to do with function ending too quickly without it
    .then(([results, fields]) => {
	resp.json(results);
    })
    .catch((err) => next(err));
});


module.exports = router;