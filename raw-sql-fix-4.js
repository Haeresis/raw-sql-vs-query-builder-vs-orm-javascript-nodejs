const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

connection.connect(function (err, handshakeResult) {
	if (err) throw err;

	// Requête SQL à considérer
	connection.query(
		fs.readFileSync('./raw-sql-issue-4.sql', { encoding: 'utf8' })
	, function (err, rows) {
		if (err) throw err;
		// Error: Table 'raw_builder_orm.boks' doesn't exist

		// Résultat
		console.log(rows);

		connection.end();
	});
});