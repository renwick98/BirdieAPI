const mysql = require ('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password:'',
    user: '',
    database: '',
    host: '',
    port: ''
});

let chirprdb ={

};

chirprdb.all = () => {

    return new Promise((resolve, reject) =>{
        pool.query(`SELECT * FROM Golf_Course`, (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });

};

chirprdb.one = (id)=>{
    return new Promise((resolve, reject) =>{
        pool.query(`SELECT * FROM users WHERE id = ?`, [id], (err, results) => {
            if(err){
                return reject (err);
            }
            return resolve(results);
        });
    });      
};

module.exports = chirprdb;