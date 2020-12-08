/*
    users.js
    
    Description: Contains all routes that request user information from the server
*/

var express = require('express');
const { successPrint } = require('../../../../CSC317/csc317-termproject-acolm/application/helpers/debug/debughelpers');
var router = express.Router();
const db = require("../config/database");

router.post("/register", (req,resp, next) => {
    let firstName = req.body.UserFirstName;
    let lastName = req.body.UserLastName;
    let email = req.body.email;
    let password1 = req.body.UserPassword1;
    let password2 = req.body.UserPassword2;

    //first validate passwords on server
    if(password1 !== password2){
        resp.redirect('/registration');//leaving this here for now
    }
    else{
        //search for email if it already has an account
        db.execute("SELECT * FROM users WHERE email=?;", [email])
        .then(([results, fields]) => {
            if(results && results.length==0){
                //hash password
            }
            else{
                //throw error
            }
        })
        //insert the new user into mysql table
        .then((hashedPassword) =>{
            let baseSQL =
            "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?);";
            return db.execute(baseSQL, [firstName,lastName,email,hashedPassword]);
        })
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                successPrint("Registration was successful!");
                resp.redirect("/login");
            }
            else{
                //throw error
            }
        })
        //catch errors
        .catch((err) => {
            //if statement
            resp.status(err.getStatus);
            resp.redirect(err.getRedirectURL());
            next(err);
        });
    }
});

router.post("/login", (req, resp, next) => {
    let email = req.body.email;
    let password = req.body.password;
    //let userID;

    //search if email is in database, is currently not included in sql statement
    db.execute("SELECT password FROM users WHERE email=?;", [email])
    .then(([results, fields]) => {
        if(results && results.length == 1){
            let hPassword = results[0].password;
            //userID = results[0].id;
            //return statement comparing passwords
        }
        else{
            //throw error
        }
    })
    .then((check) => {
        if(check){
            //success print
            //set session info
            requestAnimationFrame.redirect('/');
        }
        else{
            //throw error
        }
    })
    .catch((err) => {
        //if statement
        resp.status(err.getStatus());
        resp.redirect(err.getRedirectURL());
        next(err);
    })
});

module.exports = router;