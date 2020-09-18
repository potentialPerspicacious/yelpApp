const mysql = require('mysql');
const myPort = 3306;
const db = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'cibo',
    port: myPort,
    password: 'cibo',
    database: 'cibo'
});

db.getConnection((err) => {
    if(err){
      throw 'Error occured: ' + err;
    }
  });
  
module.exports = db;