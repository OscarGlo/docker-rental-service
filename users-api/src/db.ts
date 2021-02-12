import mysql from 'mysql';

const db = mysql.createConnection({
	host: "user-db",
	port: 3306,
	user: "root",
	password: "yolo",
	database: "users"
});

export {db};