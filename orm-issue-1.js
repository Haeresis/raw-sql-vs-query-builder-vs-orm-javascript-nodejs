const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('raw_builder_orm', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql'
});

const Roles = require('./models/roles.js')(sequelize, DataTypes);
const Users = require('./models/users.js')(sequelize, DataTypes);

const models = { Roles, Users };
Object.values(models)
	.filter(model => typeof model.associate === 'function')
	.forEach(model => model.associate(models));

(async function () {
	const role = await Roles.findOne({
		where: { name: 'Lecteur' }
	})

	const result = await Users.findAll({
		where: { roleId: role.id },
	});

	// Résultat
	console.log(JSON.stringify(role, null, 2));
	/*
	`{
	  "id": 3,
	  "name": "Lecteur"
	}`
	*/
	
	result.forEach((item) => {
		console.log(JSON.stringify(item, null, 2));
	});
	/*
	`{
	  "id": 4,
	  "roleId": 3,
	  "email": "nyx@example.com",
	  "password": "baz",
	  "role_id": 3
	}
	{
	  "id": 5,
	  "roleId": 3,
	  "email": "noctalie@example.com",
	  "password": "fooz",
	  "role_id": 3
	}
	{
	  "id": 6,
	  "roleId": 3,
	  "email": "dayski@example.com",
	  "password": "far",
	  "role_id": 3
	}`
	*/
})();