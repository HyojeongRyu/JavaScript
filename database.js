const mysql = require('mysql');

var db_info = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'tiger',
    database: 'world'
}
//make connection
var connection = mysql.createConnection(db_info);
//connect
connection.connect(function(err){
        if(err) console.error(err);
        else console.log('DB is connected successfully!');
});

module.exports = function sendQuery(q){
    connection.query(q,function(err,result,fields){
        if(err) console.error(err);
        else console.log(result);
    });
}
