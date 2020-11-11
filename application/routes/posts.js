const e = require('express');
var express = require('express');
var router = express.Router();
const db = require("../config/database");

router.get('/search/:searchTerm/:searchCategory/:searchType/:searchClass/:searchPriceMin/:searchPriceMax', (req, resp, next) => {
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
        _sql += 'class LIKE ? AND ';
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
module.exports = router;