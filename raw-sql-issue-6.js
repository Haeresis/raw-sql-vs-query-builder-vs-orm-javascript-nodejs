const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

let select;
let inner;
let where;

function runQuery(callback) {
	
	// Requête SQL à considérer
	connection.query(`
		SELECT ${select.join(', ')}
		FROM books AS b
		${inner.join(' ')}
		${where.length ? 'WHERE ' + where.join(' ') : ''};
	`, function (err, rows) {

		// Résultat
		console.log(rows);
		/*
		[
		  { title: 'The Dark Tower: The Gunslinger' },
		  { title: "The Magician's Apprentice" },
		  { title: 'The Shining' }
		]
		*/
		/*
		[
		  { book_title: 'The Shining', author_name: 'Stephen King' },
		  {
		    book_title: "The Magician's Apprentice",
		    author_name: 'Trudi Canavan'
		  }
		]
		*/

		connection.end();
	});

	callback && callback()
}

connection.connect(function (err, handshakeResult) {
	select = [
		`b.title`,
	]
	inner = []
	where = []

	runQuery(function () {

		select = [
			`b.title AS book_title`,
			`CONCAT(
				a.first_name,
				' ',
				a.last_name
			) AS author_name`,
		]
		inner = [
			`INNER JOIN authors AS a
				ON b.author_id = a.id`,
		]
		where = [
			`b.title = 'The Shining' OR`, 
			`a.last_name = 'Canavan'`
		]

		runQuery();
	});
});