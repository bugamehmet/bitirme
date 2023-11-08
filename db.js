const mysql = require('mysql');
const config = require('./config');
const connection = mysql.createConnection(config.db);

/*
const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
});
*/ 

connection.connect((error) => {
	if (error) throw error;
	else console.log('bağlanıldı!');
});
module.exports = connection;
