const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "raw_builder_orm"
});

connection.connect(function (err, handshakeResult) {
	if (err) err;

	connection.query(`
		SELECT * FROM books WHERE author_id = ?;
	`, 1, function (err, results) {
		if (err) err;

		connection.end();
	});
});