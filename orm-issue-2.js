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
    const result = await Roles.findOne({
        where: { name: 'Lecteur' },
        attributes: [],
        include: {
            model: Users,
            attributes: [Users.rawAttributes.email.field],
            required: true
        }
    });

    // Résultat
    console.log(JSON.stringify(result, null, 2));
    /*
    `{
        "Users": [
          {
            "email": "nyx@example.com"
          },
          {
            "email": "noctalie@example.com"
          },
          {
            "email": "dayski@example.com"
          }
        ]
      }`
    */

    result.Users.forEach((item) => {
      console.log(JSON.stringify(item, null, 2));
    });
    /*
    `{
      "email": "nyx@example.com"
    }
    {
      "email": "noctalie@example.com"
    }
    {
      "email": "dayski@example.com"
    }`
    */
})();