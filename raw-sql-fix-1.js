const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

// Données provenant de la requête cliente
const email = 'bruno.lesieur@example.com';
const password = `' OR email='admin@example.com' AND '1'='1`;

connection.connect(function (err, handshakeResult) {
	if (err) err;

	// Requête SQL à considérer
	connection.query(`
		SELECT id FROM users WHERE email = ? AND password = ?;
	`, [
		email,
		password
	], function (err, results) {
		if (err) err;

		// Résultat
		console.log(results);
		// `[]`

		connection.end();
	});
});