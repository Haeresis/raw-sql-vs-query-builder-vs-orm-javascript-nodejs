const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});
const authorId = 1;

connection.connect(function (err, handshakeResult) {
	if (err) err;

	connection.query(`
		SELECT * FROM books WHERE author_id = ${authorId};
	`, function (err, results) {
		if (err) err;

		console.log(results);

		connection.end();
	});
});