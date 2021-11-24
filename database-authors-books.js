const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root"
});

console.log(`Créer une connexion à l'instance MySQL`)
connection.connect(function (err, handshakeResult) {
	if (err) {
		console.log(`Connexion à l'instance MySQL échouée`, err)
		throw err;
	}
	console.log(`Connexion à l'instance MySQL réussi`)

	console.log('Créer une base de donnée')
	connection.query(`
		CREATE DATABASE raw_builder_orm;
	`, function (err, creationResult) {
		if (err) {
			console.log('Création de la base de donnée échouée', err)
			throw err;
		}
		console.log('Création de la base de donnée réussi', creationResult)

		console.log('Connexion à la base de donnée')
		connection.changeUser({ database : 'raw_builder_orm' }, function (err) {
			if (err) {
				console.log('Connexion à la base de donnée échouée', err)
				throw err;
			}
			console.log('Connexion à la base de donnée réussi')

			console.log('Création de la table `authors`')
			connection.query(`
				CREATE TABLE authors
				(
					id INT NOT NULL,
					first_name VARCHAR(255) NOT NULL,
					last_name VARCHAR(255) NOT NULL,

					PRIMARY KEY (id),
					INDEX first_name_idx (first_name),
					INDEX last_name_idx (last_name)
				);
			`, function (err, authorCreationResult) {
				if (err) {
					console.log('Création de la table `authors` échouée', err)
					throw err;
				}
				console.log('Création de la table `authors` réussi', authorCreationResult)

				console.log('Création de la table `books`')
				connection.query(`
					CREATE TABLE books
					(
						id INT NOT NULL,
						author_id INT NOT NULL,
						title VARCHAR(255) NOT NULL,
						original_language CHAR(2) NOT NULL,
						isbn CHAR(17) NOT NULL,

						PRIMARY KEY (id),
						FOREIGN KEY (author_id) REFERENCES authors (id) ON UPDATE CASCADE ON DELETE RESTRICT,
						INDEX title_idx (title),
						INDEX original_language_idx (original_language),
						INDEX isbn_idx (isbn)
					);
				`, function (err, bookCreationResult) {
					if (err) {
						console.log('Création de la table `books` échouée', err)
						throw err;
					}
					console.log('Création de la table `books` réussi', bookCreationResult)

					console.log(`Fin de la connexion à l'instance MySQL`)
					connection.end(function (err) {
						if (err) {
							console.log(`Fin de la connexion à l'instance MySQL échouée`, err)
							throw err;
						}
						console.log(`Fin de la connexion à l'instance MySQL réussi`)
					});
				});
			});
		});
	});
});