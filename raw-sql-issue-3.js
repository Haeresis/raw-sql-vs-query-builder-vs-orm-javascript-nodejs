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
		SELECT
			b.title AS book_title,
			CONCAT(
				a.first_name,
				' ',
				a.last_name
			) AS author_name
		FROM books AS b
		INNER JOIN authors AS a
			ON b.author_id = a.id
		WHERE (
			b.title = 'The Shining' 
				OR 
			a.last_name = 'Canavan'
		);
	`, function (err, rows) {

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