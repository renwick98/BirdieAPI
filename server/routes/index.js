const express = require('express');
const bodyParser = require("body-parser");
const db = require('../db');
const router = express.Router();

// Authorisation Routes 
router.post('/signup', async (req, res) => {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    // SAVING THE BODY OF THE REQUEST AS userEmail FOR userEmail AND userPassword FOR userPassword
    try{
        let results = await db.signup(userEmail, userPassword)
        res.json(results);
        // RUNS REQUEST TO THE index.js OF THE db FOLDER TO EXECUTE THE QUERIES
        // THE RETURNED RESULT FROM db.signup WITHIN THE db FOLDER IS CONVERTED TO JSON AND SENT AS A RESPONSE.
    } catch(e){
        // IF THERE IS AN ERROR, WE CATCH THE ERROR AND LOG IT TO THE CONSOLE.
        // WE ALSO SEND THE ERROR TO CALL FOR DIAGNOSTICS BUT DON'T SHOW THE ERROR TO THE USER.
        console.log(e)
        res.json(e)
    }
});

router.post('/authenticateUser', async (req, res) => {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    console.log('ATTEMPTING TO AUTENTICATE USER EMAIL:'+userEmail+ ' AND PASSWORD: '+userPassword)
    try{
        let results = await db.authenticateUser(userEmail, userPassword);
        res.json(results);
    }catch(e){
        res.json('AUTHENTICATION FAILED: '+e)
    }
    
});


// Scorecard Routes
router.get('/getAllScorecards', async (req, res, next) =>{
    try{
        let results = await db.getAllScorecards();
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/dev', async (req, res, next) =>{
    try{
        let results = await db.dev();
        res.json(results);
        console.log(results)
    } catch(e){
        console.log(e);
       
        res.sendStatus(500);
    }
});

router.get('/getAllScorecards', async (req, res, next) =>{
    try{
        let results = await db.getAllScorecards();
        res.json(results);
        console.log(results)
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/teeColour', async (req, res, next) =>{
    try{
        let results = await db.teeColour();
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/courseDetails', async (req, res, next) =>{
    try{
        let results = await db.courseDetails();
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

// Game Screen Routes
router.get('/holeDataWhite/:courseID', async (req, res, next) =>{
    try{
        let results = await db.holeDataWhite(req.params.courseID);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/holeDataBlue/:courseID', async (req, res, next) =>{
    try{
        let results = await db.holeDataBlue(req.params.courseID);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/holeDataRed/:courseID', async (req, res, next) =>{
    try{
        let results = await db.holeDataRed(req.params.courseID);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/holeDataYellow/:courseID', async (req, res, next) =>{
    try{
        let results = await db.holeDataYellow(req.params.courseID);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
// Scorecard Routes
router.get('/scorecardGet/:scorecardID', async (req, res, next) =>{ 
    try{
        let results = await db.scorecardGet(req.params.scorecardID);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;


