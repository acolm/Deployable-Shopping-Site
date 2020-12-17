/*
    posts.js
    
    Description: Contains all routes that request post information from the server
*/

const e = require('express');
var express = require('express');
var router = express.Router();
const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;
const db = require("../config/database");
const UserError = require("../helpers/errors/UserError");

// TODO(Lothar): Ensure the user is logged in as the correct user
router.post('/createMessage', (req, resp, next) => {
    let arguments = [];
    //probably do validation before sending to sql
    arguments.push(req.body.senderID);
    arguments.push(req.body.userID);
    arguments.push(req.body.message);
    arguments.push(req.body.postID);

    let baseSQL = `INSERT INTO messages(fk_sender, fk_receiver, message, fk_post)`; //currently missing session data
    let sqlValues = ` VALUES(?,?,?,?)`;
    
    let combine = baseSQL+sqlValues;
    console.log(combine);
    for (let i = 0; i < arguments.length; i++){
        console.log(arguments[i]);
    }
    
    db.execute(combine, arguments)
    .then(([results, fields]) => {
        if(results && results.affectedRows){
            successPrint('Message sent');
            // resp.redirect("/");
            resp.redirect("/posts/" + req.body.postID);
        }
        else{
            throw new UserError("Failed to send message", 
            "/",
            500);
        }
    })
    .catch((err) => {
        if(err instanceof UserError){
            errorPrint(err.message);
            resp.status(err.status);
            resp.redirect(err.redirectURL);
        }
        else{
            next(err);
        }
    })
});

// TODO(Lothar): Ensure the user is logged in as the correct user
router.get('/getMessagesForUser/:userid', (req, resp, next) => {
    let id = req.params.userid;
    
    let arguments = [];
    let _sql = 'SELECT m.id, m.created, m.message, m.fk_post AS postID, \
    p.title AS postTitle, u.email \
    FROM messages m \
    JOIN posts p ON m.fk_post = p.id \
    JOIN users u ON m.fk_sender = u.id WHERE m.fk_receiver = ?';
    arguments.push(id);
    db.query(_sql, arguments)
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
});

/*
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
    let _sql = 'SELECT p.id, p.title, p.category, p.price, p.created, p.thumbnail FROM posts p \
    WHERE approved = 1 ORDER BY p.created DESC LIMIT ';
    _sql += count;          //For some reason, this wont work unless I add onto this string
    db.query(_sql)          //Might have to do with function ending too quickly without it
    .then(([results, fields]) => {
	resp.json(results);
    })
    .catch((err) => next(err));
});
*/

module.exports = router;