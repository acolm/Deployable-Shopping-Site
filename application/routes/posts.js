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
    searchTerm = "%"+searchTerm+"%";
    var arguments = [searchTerm];
    if(searchCategory !== "All"){
        _sql += ' AND category LIKE ?;';
        arguments.push(searchCategory);
    }
    else{
        _sql +=';';
    }
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
    searchTerm = "%"+searchTerm+"%";
    var arguments = [searchTerm];
    if(searchCategory !== "All"){
        _sql += ' AND category LIKE ?';
        arguments.push(searchCategory);
    }
    if(searchType !== "All"){
        _sql += ' AND type LIKE ?';
        arguments.push(searchType);
    }
    _sql +=';';

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
    searchTerm = "%"+searchTerm+"%";
    var arguments = [searchTerm];
    if(searchCategory !== "All"){
        _sql += ' AND category LIKE ?';
        arguments.push(searchCategory);
    }
    if(searchType !== "All"){
        _sql += ' AND type LIKE ?';
        arguments.push(searchType);
    }
    if(searchClass !== ""){
        _sql += ' AND class LIKE ?';
        arguments.push(searchClass);
    }
    _sql +=';';
    console.log(searchClass);
    console.log(_sql);

    db.query(_sql, arguments)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});
module.exports = router;