const mysql=require('mysql');

exports.db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345",
    database:"webmobi"
});