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
		FROM users AS u
		${inner.join(' ')}
		${where.length ? 'WHERE ' + where.join(' ') : ''};
	`, function (err, rows) {

		// Résultat
		console.log(rows);
		/*
		`[
		  { email: 'admin@example.com' },
		  { email: 'bruno@example.com' },
		  { email: 'dayski@example.com' },
		  { email: 'magalie@example.com' },
		  { email: 'noctalie@example.com' },
		  { email: 'nyx@example.com' }
		]`
		*/
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

	callback && callback()
}

connection.connect(function (err, handshakeResult) {
	select = [
		`u.email`,
	]
	inner = []
	where = []

	runQuery(function () {

		select = [
			`u.email`,
			`r.name`,
		]
		inner = [
			`INNER JOIN roles AS r
				ON u.role_id = r.id`,
		]
		where = [
			`u.email = 'bruno@example.com' OR`, 
			`r.name = 'Lecteur'`
		]

		runQuery();
	});
});