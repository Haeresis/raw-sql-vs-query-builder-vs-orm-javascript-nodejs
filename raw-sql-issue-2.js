const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

connection.connect(function (err, handshakeResult) {

	// Requête SQL à considérer
	connection.query(`
		SELECT * FROM users WERE email = ? AND password = ?;
	`, [
		'bruno@example.com',
		'foo'
	], function (err, rows) {

		// Résultat
		console.log(rows);
		// `undefined`

		connection.end();
	});
});