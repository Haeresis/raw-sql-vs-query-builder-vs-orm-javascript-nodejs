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
const query = knex
	.from('users')
	.select('id')
	.where({
  		email: 'bruno.lesieur@example.com',
  		password: 'bar'
	});

// Requête SQL générée
console.log(query.toSQL().toNative());
/*
{
  sql: 'select `id` from `users` where `email` = ? and `password` = ?',
  bindings: [ 'bruno.lesieur@example.com', 'bar' ]
}
*/

// Exécution de la requête
query.then((rows) => {

	// Résultat
	console.log(rows);
	// `[ { id: 2 } ]`

}).catch((err) => {
	throw err;
})
.finally(() => {
    knex.destroy();
});