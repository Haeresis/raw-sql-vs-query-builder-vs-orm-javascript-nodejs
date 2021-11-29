const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

connection.connect(function (err, handshakeResult) {
	if (err) throw err;

	// Requête SQL à considérer
	connection.query(`
		SELECT * FROM users WERE email = ? AND password = ?;
	`, [
		'bruno.lesieur@example.com',
		'bar'
	], function (err, rows) {
		if (err) throw err;
		// Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'email = 'bruno.lesieur@example.com' AND password = 'bar'' at line 1

		// Résultat
		console.log(rows);

		connection.end();
	});
});