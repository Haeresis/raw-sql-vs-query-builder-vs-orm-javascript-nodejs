const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'raw_builder_orm'
  }
});

// Données provenant de la requête cliente
let query = knex.from('users');

/* ... */

// ...plus tard après plusieurs conditions...
query.select('id');

/* ... */

// ...et encore plus tard après plusieurs demandes de paramètres...

query.where({
	email: 'bruno.lesieur@example.com',
	password: 'bar'
});

/* ... */

// ...et encore plus tard alors qu'on ne veut pas l'`id`, mais l'`email`...
query
	.clear('select')
	.select('email');

/* ... */

// ...et finalement, plus tard, alors que l'utilisateur est administrateur, je veux aussi voir l'`id` de role du membre.
query.select('role_id')

// Requête SQL générée
console.log(query.toSQL().toNative());
/*
{
  sql: 'select `email`, `role_id` from `users` where `email` = ? and `password` = ?',
  bindings: [ 'bruno.lesieur@example.com', 'bar' ]
}
*/

// Exécution de la requête
query.then((rows) => {

	// Résultat
	console.log(rows);
	// `[ { email: 'bruno.lesieur@example.com', role_id: 2 } ]`

}).catch((err) => {
	throw err;
})
.finally(() => {
    knex.destroy();
});