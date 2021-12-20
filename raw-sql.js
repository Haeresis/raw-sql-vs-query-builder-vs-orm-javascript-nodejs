const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

// Données provenant de la requête cliente
const email = 'bruno@example.com';
const password = 'foo';

connection.connect(function (err, handshakeResult) {
	if (err) throw err;

	// Requête SQL à considérer
	connection.query(`
		SELECT id FROM users WHERE email = '${email}' AND password = '${password}';
	`, function (err, rows) {
		if (err) throw err;

		// Résultat
		console.log(rows);
		// `[ { id: 2 } ]`

		connection.end();
	});
});