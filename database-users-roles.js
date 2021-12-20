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

	console.log('Suppression de la base de donnée')
	connection.query(`
		DROP DATABASE IF EXISTS raw_builder_orm;
	`, function (err, deletionResult) {
		if (err) {
			console.log('Suppression de la base de donnée échouée', err)
			throw err;
		}
		console.log('Suprresion de la base de donnée réussi', deletionResult)

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

				console.log('Création de la table `roles`')
				connection.query(`
					CREATE TABLE roles
					(
						id INT NOT NULL AUTO_INCREMENT,
						name VARCHAR(255) NOT NULL,

						PRIMARY KEY (id),
						INDEX name_idx (name)
					);
				`, function (err, authorCreationResult) {
					if (err) {
						console.log('Création de la table `roles` échouée', err)
						throw err;
					}
					console.log('Création de la table `roles` réussi', authorCreationResult)

					console.log('Remplissage de la table `roles`')
					connection.query(`
						INSERT INTO roles (name)
						VALUES
							('Administrateur'),
							('Éditeur'),
							('Lecteur');
					`, function (err, authorInsertedResult) {
						if (err) {
							console.log('Remplissage de la table `roles` échouée', err)
							throw err;
						}
						console.log('Remplissage de la table `roles` réussi', authorInsertedResult)

						console.log('Création de la table `users`')
						connection.query(`
							CREATE TABLE users
							(
								id INT NOT NULL AUTO_INCREMENT,
								role_id INT NOT NULL,
								email VARCHAR(255) NOT NULL,
								password VARCHAR(255) NOT NULL,

								PRIMARY KEY (id),
								FOREIGN KEY (role_id) REFERENCES roles (id) ON UPDATE CASCADE ON DELETE RESTRICT,
								INDEX email_idx (email),
								INDEX password_idx (password)
							);
						`, function (err, bookCreationResult) {
							if (err) {
								console.log('Création de la table `users` échouée', err)
								throw err;
							}
							console.log('Création de la table `users` réussi', bookCreationResult)

							console.log('Remplissage de la table `users`')
							connection.query(`
								INSERT INTO users (role_id, email, password)
								VALUES
									(1, 'admin@example.com', 'unknown'),
									(2, 'bruno@example.com', 'foo'),
									(2, 'magalie@example.com', 'bar'),
									(3, 'nyx@example.com', 'baz'),
									(3, 'noctalie@example.com', 'fooz'),
									(3, 'dayski@example.com', 'far');
							`, function (err, authorInsertedResult) {
								if (err) {
									console.log('Remplissage de la table `users` échouée', err)
									throw err;
								}
								console.log('Remplissage de la table `users` réussi', authorInsertedResult)

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
		});
	});
});