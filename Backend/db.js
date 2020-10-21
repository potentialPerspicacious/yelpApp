const mysql = require('mysql');
const db = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    user: 'yelp',
    port: 3306,
    password: 'yelp@1234',
    database: 'yelpDB'
});

// db.getConnection((err) => {
//     if(err){
//       console.log(err)
//       throw 'Error occured: ' + err;
       
//     } else {
//         console.log("Database connection successful.")
//     }
//   });

db.connect((err) => {
  if (err) {
    console.log(`Some error has occured: ${err}`);
  } else {
  console.log('Database connection successful.')
  }
});
  
module.exports = db;