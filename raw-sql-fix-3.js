const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

connection.connect(function (err, handshakeResult) {
	if (err) err;

	// Requête SQL à considérer
	connection.query(
		fs.readFileSync('./raw-sql-fix-3.sql', { encoding: 'utf8' })
	, function (err, results) {
		if (err) err;

		// Résultat
		console.log(results);
		/*
		`[
		  { book_title: 'The Shining', author_name: 'Stephen King' },
		  {
		    book_title: "The Magician's Apprentice",
		    author_name: 'Trudi Canavan'
		  }
		]`
		*/

		connection.end();
	});
});