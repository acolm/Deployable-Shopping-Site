const e = require('express');
var express = require('express');
var router = express.Router();
const db = require("../config/database");

router.get('/search/:searchTerm/:searchCategory', (req, resp, next) => {
    let searchTerm = req.params.searchTerm;
    let searchCategory = req.params.searchCategory;
    let _sql = 'SELECT p.id, p.title, p.price, p.thumbnail, p.created, p.type \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    WHERE title LIKE ?';
    var check = 0;
    var arguments = [" "];
    if(searchTerm === "noValue"){
        _sql = 'SELECT * FROM posts p';
        if(searchCategory !=="All"){
            _sql += ' WHERE';
            check =1;
        }
    }
    else{
        searchTerm = "%"+searchTerm+"%";
        arguments.push(searchTerm);
    }
    if(searchCategory !== "All"){
        if(check ===0){_sql += ' AND'};
        _sql += ' category LIKE ?';
        arguments.push(searchCategory);
    }
    _sql += ';';
    arguments.shift();
    db.query(_sql, arguments)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});

router.get('/searchType/:searchTerm/:searchCategory/:searchType', (req, resp, next) => {
    let searchTerm = req.params.searchTerm;
    let searchCategory = req.params.searchCategory;
    let searchType = req.params.searchType;
    let _sql = 'SELECT p.id, p.title, p.price, p.thumbnail, p.created, p.type \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    WHERE title LIKE ?';
    var arguments = [" "];
    var check = [0, 0];
    if(searchTerm === "noValue"){
        _sql = 'SELECT * FROM posts p';
        if(searchCategory !=="All" || searchType !=="All"){
            _sql += ' WHERE';
            check[0] =1;
        }
    }
    else{
        searchTerm = "%"+searchTerm+"%";
        arguments.push(searchTerm);
    }
    if(searchCategory !== "All"){
        if(check[0] ===0){_sql += ' AND'};
        _sql += ' category LIKE ?';
        arguments.push(searchCategory);
        check[1] = 1;
    }
    if(searchType !== "All"){
        if(check[0] ===0 || check[1] ===1){_sql += ' AND'};
        _sql += ' type LIKE ?';
        arguments.push(searchType);
    }
    _sql +=';';
    arguments.shift();
    db.query(_sql, arguments)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});

router.get('/BIGsearch/:searchTerm/:searchCategory/:searchType/:searchClass', (req, resp, next) => {
    let searchTerm = req.params.searchTerm;
    let searchCategory = req.params.searchCategory;
    let searchType = req.params.searchType;
    let searchClass = req.params.searchClass;
    let _sql = 'SELECT p.id, p.title, p.price, p.thumbnail, p.created, p.type \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    WHERE title LIKE ?';
    var check = [0,0,0];
    var arguments = [" "];
    if(searchTerm === "noValue"){
        _sql = 'SELECT * FROM posts p';
        if(searchClass !== "" || searchCategory !=="All" || searchType !=="All"){
            _sql += ' WHERE';
            check[0] =1;
        }
    }
    else{
        searchTerm = "%"+searchTerm+"%";
        arguments.push(searchTerm);
    }
    if(searchCategory !== "All"){
        if(check[0] ===0){_sql += ' AND'};
        _sql += ' category LIKE ?';
        arguments.push(searchCategory);
        check[1] = 1;
    }
    if(searchType !== "All"){
        if(check[0] ===0 || check[1]===1){_sql += ' AND'};
        _sql += ' type LIKE ?';
        arguments.push(searchType);
        check[2] = 1;
    }
    if(searchClass !== ""){
        if(check ===0 || check[1] ===1 || check[2] === 1){_sql += ' AND'};
        _sql += ' class LIKE ?';
        arguments.push(searchClass);
    }
    _sql +=';';
    arguments.shift();
    db.query(_sql, arguments)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});

router.get('/fullsearch/:searchTerm/:searchCategory/:searchType/:searchClass/:searchPriceMin/:searchPriceMax', (req, resp, next) => {
    let searchTerm = req.params.searchTerm;
    let searchCategory = req.params.searchCategory;
    let searchType = req.params.searchType;
    let searchClass = req.params.searchClass;
    let searchPriceMin = req.params.searchPriceMin;
    let searchPriceMax = req.params.searchPriceMax;
    
    let arguments = [];
    let _sql = 'SELECT p.id, p.title, p.price, p.thumbnail, p.created, p.type \
    FROM posts p WHERE ';
    if (searchTerm !== '__NO_VALUE__') {
        _sql += 'title LIKE ? AND ';
        arguments.push('%' + searchTerm + '%');
    }
    if(searchCategory !== 'All'){
        _sql += 'category = ? AND ';
        arguments.push(searchCategory);
    }
    if(searchType !== 'All'){
        _sql += 'type = ? AND ';
        arguments.push(searchType);
    }
    if(searchClass !== '__NO_VALUE__'){
        _sql += 'class = ? AND ';
        arguments.push('%' + searchClass + '%');
    }
    if(searchPriceMin !== '__NO_VALUE__'){
        _sql += 'price >= ' + searchPriceMin + ' AND ';
    }
    if(searchPriceMax !== '__NO_VALUE__'){
        _sql += 'price <= ' + searchPriceMax + ' AND ';
    }
    _sql +='approved = 1;';
    db.query(_sql, arguments)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});

router.get('/getitem/:itemId', (req, resp, next) => {
    let itemId = req.params.itemId;
    
    let _sql = 'SELECT p.id, p.title, p.description, p.price, p.type, p.class, p.created, p.photopath, p.category, \
    u.firstname, u.lastname, u.profilepic \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    WHERE p.id = ' + itemId + ';';
    db.query(_sql)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});

module.exports = router;