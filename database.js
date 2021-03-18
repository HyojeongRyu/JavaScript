const mysql = require('mysql');

var db_info = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'tiger',
    database: 'testdb'
}
//make connection
exports.connection = mysql.createConnection(db_info);
//connect
exports.conn = function (connection){
    connection.connect(function(err){
        if(err) console(err);
        else console.log('DB is connected successfully!');
    });
}

