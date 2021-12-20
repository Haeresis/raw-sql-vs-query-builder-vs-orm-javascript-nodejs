const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('raw_builder_orm', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

// Définition des modèles
const Roles = require('./models/roles.js')(sequelize, DataTypes);
const Users = require('./models/users.js')(sequelize, DataTypes);

// Association des modèles
const models = { Roles, Users };
Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

(async function () {
    await sequelize.sync({ alter: true });

    const users = await Users.findAll({
    where: {
      email: 'bruno@example.com'
    }
    });

    // Résultat
    console.log(users);
    /*
    `[
      Users {
        dataValues: {
          id: 2,
          roleId: 2,
          email: 'bruno@example.com',
          password: 'foo',
          role_id: 2
        },
        _previousDataValues: {
          id: 2,
          roleId: 2,
          email: 'bruno@example.com',
          password: 'foo',
          role_id: 2
        },
        _changed: Set {},
        _options: {
          isNewRecord: false,
          _schema: null,
          _schemaDelimiter: '',
          raw: true,
          attributes: [Array]
        },
        isNewRecord: false
      }
    ]`
    */
})();