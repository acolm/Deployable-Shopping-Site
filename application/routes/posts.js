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
    var check = [0,0];
    var arguments;
    if(searchTerm === "noValue"){
        _sql = `SELECT * FROM posts p`;
        check[0] =1;
        if(searchCategory !== "All"){
            _sql += " WHERE category LIKE ?";
            searchCategory = "%"+searchCategory+"%";
            check[1] =1;
        }
    }
    else{
        searchTerm = "%"+searchTerm+"%";
        if(searchCategory !== "All"){
            _sql += ' AND category LIKE ?';
            check[1] =1;
        }
    }
    if(check[0] === 0){
        if(check[1] === 1){
            arguments = [searchTerm, searchCategory];
        }
        else{
            arguments = [searchTerm];
        }
    }
    else{
        if(check[1] === 1){
            arguments = [searchCategory];
        }
    }



    _sql += ";";
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

    db.query(_sql, arguments)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});
module.exports = router;