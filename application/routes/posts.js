const e = require('express');
var express = require('express');
var router = express.Router();
const db = require("../config/database");

router.get('/search/:searchTerm/:searchCategory/:searchOrder', (req, resp, next) => {
    let searchTerm = req.params.searchTerm;
    let searchCategory = req.params.searchCategory;
    let searchOrder = req.params.searchOrder;
    
    let arguments = [];
    let _sql = 'SELECT p.id, p.title, p.price, p.thumbnail, p.created, p.type \
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
    let _sql = 'SELECT p.id, p.title, p.description, p.price, p.type, p.class, p.created, p.photopath, p.category, \
    u.firstname, u.lastname, u.profilepic \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    WHERE p.id=?;';
    console.log("step 2");
    db.query(_sql,_id)
    .then(([results, fields]) => {
        resp.json(results[0]);
    })
    .catch((err) => next(err));
});

module.exports = router;