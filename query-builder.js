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

// ... later after some condition stuff...
query.select('id');

/* ... */

// ...and still lates after some parameters requirement...

query.where({
	email: 'bruno.lesieur@example.com',
	password: 'bar'
});

/* ... */

// ...and later something not require the `id`, but the `email`...
query
	.clear('select')
	.select('email');

/* ... */

// ...and finaly, later, because the user is admin, I can also see the role of the member.
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