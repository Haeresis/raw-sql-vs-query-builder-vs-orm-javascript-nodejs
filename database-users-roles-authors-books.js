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
		DROP DATABASE raw_builder_orm;
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
							('Owner'),
							('Member');
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
									(1, 'admin@example.com', 'foo'),
									(2, 'bruno.lesieur@example.com', 'bar');
							`, function (err, authorInsertedResult) {
								if (err) {
									console.log('Remplissage de la table `users` échouée', err)
									throw err;
								}
								console.log('Remplissage de la table `users` réussi', authorInsertedResult)

								console.log('Création de la table `authors`')
								connection.query(`
									CREATE TABLE authors
									(
										id INT NOT NULL AUTO_INCREMENT,
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

									console.log('Remplissage de la table `authors`')
									connection.query(`
										INSERT INTO authors (first_name, last_name)
										VALUES
											('Stephen', 'King'),
											('Trudi', 'Canavan');
									`, function (err, authorInsertedResult) {
										if (err) {
											console.log('Remplissage de la table `authors` échouée', err)
											throw err;
										}
										console.log('Remplissage de la table `authors` réussi', authorInsertedResult)

										console.log('Création de la table `books`')
										connection.query(`
											CREATE TABLE books
											(
												id INT NOT NULL AUTO_INCREMENT,
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

											console.log('Remplissage de la table `books`')
											connection.query(`
												INSERT INTO books (author_id, title, original_language, isbn)
												VALUES
													(1, 'The Shining', 'EN', '978-0307743657'),
													(1, 'The Dark Tower: The Gunslinger', 'EN', '978-0-937986-50-9'),
													(2, 'The Magician''s Apprentice', 'EN', '978-0-316-03788-4');
											`, function (err, authorInsertedResult) {
												if (err) {
													console.log('Remplissage de la table `books` échouée', err)
													throw err;
												}
												console.log('Remplissage de la table `books` réussi', authorInsertedResult)

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
			});
		});
	});
});