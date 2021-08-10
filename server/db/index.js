
const mysql = require ('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'MJQXRTEY',
    user: 'admin',
    database: 'birdieDB',
    host: 'birdiedb-instance.cvmkfyfhk7st.eu-west-2.rds.amazonaws.com',
    port: '3306'
});

let queryRoutes = { };

// Authentication Routes
queryRoutes.signup = (userEmail, userPassword)=>{
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT User.userEmail FROM User WHERE User.userEmail = ?`, userEmail, (err, results) => {
            if(results!=''||err){
                // IF THE USER IS ALREADY PRESENT, THEN THE SYSTEM RETURNS A REJECTION, THIS IS BECAUSE EMAILS MUST BE UNIQUE WITHIN THE SYSTEM.
                // IF THE QUERY FAILS IT ALSO SENDS A REJECTION.
                return reject ('PLEASE TRY AGAIN. '+err);
            }
            // IF AN ACCOUNT IS ALREADY REGISTERED, IT WILL DISPLAY AN ERROR MESSAGE TO THE 
            // SCREEN AS TWO ACCOUNTS CAN'T SHARE THE SAME EMAIL. EMAIL MUST BE UNIQUE.
            
            // IF THE EMAIL IS UNIQUE THEN THE USER EMAIL AND PASSWORD ARE REGISTERED 
            // TO THE DATABASE AS A POST REQUEST. TWO ACCOUNTS CAN SHARE THE SAME PASSWORD.
            pool.query(`INSERT INTO User (userEmail, userPassword) VALUES (?, ?)`, [userEmail, userPassword], (err, results) => {
                if(err){
                    return reject (err);
                    // IF THERE IS AN ERROR RUNNING THIS BLOCK OF SQL, THE ERROR IS SAVED AND 
                    // RETURN AS A REJECTION TO THE ROUTES FUNCTION THAT CALLED IT
                }
                // IF THE QUERIES ARE SUCCSESFULL THEN THE RESOLVE IS SENT TO THE CALLING FUNCTION,
                // TO ALLERT THE SYSTEM THAT THE USER HAS BEEN ADDED TO THE SYSTEM.
                results='USER SIGN UP COMPLETE'
                return resolve(results);
            });
        });
    });
};


queryRoutes.authenticateUser = (userEmail, userPassword)=>{
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT User.userEmail, User.userPassword, User.userID FROM User WHERE User.userEmail = ?`, [userEmail], (err, results) => {
            if(err){
                return reject (err);
            }
            
            const passwords = results
            let resultObject = []
            passwords.map(result => (
                resultObject = result
                
            ));
            dbValEmail = resultObject.userEmail
            dbValPassword = resultObject.userPassword
            dbValID = resultObject.userID
            console.log('USER EMAIL: ' + resultObject.userEmail)
            console.log('USER PASSWORD: ' + resultObject.userPassword)

            if(dbValEmail != userEmail){
                err = 'EMAIL INCORRECT'
                console.log("EMAIL IS INCORRECT")
                return reject (err)
            }
            if(dbValPassword != userPassword){
                console.log("PASSWORD IS INCORRECT")
                err = 'PASSWORD INCORRECT'
                return reject (err)
            }
                console.log("EMAIL AND PASSWORD ARE CORRECT")
            
            return resolve(dbValID);
        });
    });      
};







// Game Screen Routes
queryRoutes.holeDataWhite = (courseID)=>{
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT Course_Hole.holeID, Course_Hole.holeSequence, Course_Hole.courseID, Course_Hole.parWhite, Course_Hole.yardsWhite, Course_Hole.strokeIndexWhite
        FROM Course_Hole
        WHERE Course_Hole.courseID = ?`, [courseID], (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });      
};

queryRoutes.holeDataBlue = (courseID)=>{
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT Course_Hole.holeID, Course_Hole.holeSequence, Course_Hole.courseID, Course_Hole.parBlue, Course_Hole.yardsBlue, Course_Hole.strokeIndexBlue
        FROM Course_Hole
        WHERE Course_Hole.courseID = ?`, [courseID], (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });      
};

queryRoutes.holeDataRed= (courseID)=>{
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT Course_Hole.holeID, Course_Hole.holeSequence, Course_Hole.courseID, Course_Hole.parRed, Course_Hole.yardsRed, Course_Hole.strokeIndexRed
        FROM Course_Hole
        WHERE Course_Hole.courseID = ?`, [courseID], (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });      
};

queryRoutes.holeDataYellow= (courseID)=>{
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT Course_Hole.holeID, Course_Hole.holeSequence, Course_Hole.courseID, Course_Hole.parYellow, Course_Hole.yardsYellow, Course_Hole.strokeIndexYellow
        FROM Course_Hole
        WHERE Course_Hole.courseID = ?`, [courseID], (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });      
};
// Scorecard Routes
queryRoutes.getAllScorecards = () => {

    return new Promise((resolve, reject) =>{
        pool.query(`SELECT Score_Card.scorecardID, User.userEmail,  Golf_Course.courseName, Score_Card_Hole_Instance.holeValue, Score_Card_Hole_Instance.holeID, Course_Tee.teeDesc 
        FROM Score_Card 
        JOIN User ON 
        Score_Card.userID = User.userID 
        JOIN Golf_Course ON 
        Score_Card.courseID=Golf_Course.courseID 
        JOIN Course_Tee ON Score_Card.teeID=Course_Tee.teeID 
        JOIN Score_Card_Hole_Instance ON Score_Card.scorecardID = Score_Card_Hole_Instance.scorecardID`, (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });
};
// Returns all tee colours
queryRoutes.teeColour = () => {

    return new Promise((resolve, reject) =>{
        pool.query(`SELECT teeID, teeDesc FROM Course_Tee;`, (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });
};
// Returns all Golf Course rows of data
queryRoutes.courseDetails = () => {

    return new Promise((resolve, reject) =>{
        pool.query(`SELECT 
        courseID, 
        courseName,
        courseRatingBlue,
        courseRatingRed,
        courseRatingWhite,
        courseRatingYellow,
        courseSlopeRatingBlue,
        courseSlopeRatingRed,
        courseSlopeRatingWhite,
        courseSlopeRatingYellow,
        courseTotalParBlue,
        courseTotalParRed,
        courseTotalParWhite,
        courseTotalParYellow,
        courseBogeyRatingBlue,
        courseBogeyRatingRed,
        courseBogeyRatingWhite,
        courseBogeyRatingYellow
        FROM Golf_Course`, (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });
};

// Gets array of user score entries to Scorecard table
queryRoutes.scorecardGet = (scorecardID) => {

    return new Promise((resolve, reject) =>{
        pool.query(`SELECT Score_Card.scorecardID, User.userEmail, Golf_Course.courseName, Score_Card_Hole_Instance.holeValue, Course_Tee.teeDesc 
        FROM Score_Card 
        JOIN User ON 
        Score_Card.userID = User.userID 
        JOIN Golf_Course ON 
        Score_Card.courseID  = Golf_Course.courseID 
        JOIN Course_Tee ON Score_Card.teeID = Course_Tee.teeID 
        JOIN Score_Card_Hole_Instance ON Score_Card.scorecardID = Score_Card_Hole_Instance.scorecardID 
        WHERE Score_Card_Hole_Instance.scorecardID = ?`, [scorecardID], (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });
};

module.exports = queryRoutes;