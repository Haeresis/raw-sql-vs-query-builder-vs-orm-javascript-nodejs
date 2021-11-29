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