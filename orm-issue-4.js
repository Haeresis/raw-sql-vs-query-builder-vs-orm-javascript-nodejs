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
	const roleIds = [2, 3];
	const usersIds = {};

	await Promise.all(roleIds.map(async (roleId) => {
		usersIds[roleId] = await Users.findAll({ 
			where: { roleId: roleId }
		});
		usersIds[roleId] = usersIds[roleId].map(x => x.id)
	}));

	console.log(JSON.stringify(usersIds, null, 2));
	/*
	`{
	  "2": [
		2,
		3
	  ],
	  "3": [
		4,
		5,
		6
	  ]
	}`
	*/
})();