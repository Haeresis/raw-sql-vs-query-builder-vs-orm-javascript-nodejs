const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

connection.connect(function (err, handshakeResult) {

	const select = `
		SELECT
			u.email,
			r.name
	`;
	const from = `
		FROM users AS u
		INNER JOIN roles AS r
			ON u.role_id = r.id
	`;
	const where = `
		WHERE (
			u.email = 'bruno@example.com' 
				OR 
			r.name = 'Lecteur'
		);
	`;

	// Requête SQL à considérer
	connection.query(select + from + where, function (err, rows) {

		// Résultat
		console.log(rows);
		/*
		`[
		  { email: 'bruno@example.com', name: 'Éditeur' },
		  { email: 'nyx@example.com', name: 'Lecteur' },
		  { email: 'noctalie@example.com', name: 'Lecteur' },
		  { email: 'dayski@example.com', name: 'Lecteur' }
		]`
		*/

		connection.end();
	});
});