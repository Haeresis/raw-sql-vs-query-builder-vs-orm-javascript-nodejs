const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

connection.connect(function (err, handshakeResult) {

	// Requête SQL à considérer
	connection.query(
		fs.readFileSync('./raw-sql-fix-3.sql', { encoding: 'utf8' })
	, function (err, rows) {

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