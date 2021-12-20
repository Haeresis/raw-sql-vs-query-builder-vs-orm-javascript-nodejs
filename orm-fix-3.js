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
    const result = await Users.findAll();
    console.log(JSON.stringify(result, null, 2));
    /*
    `[
      {
        "id": 1,
        "roleId": 1,
        "email": "admin@example.com",
        "password": "unknown",
        "role_id": 1
      },
      {
        "id": 2,
        "roleId": 2,
        "email": "bruno@example.com",
        "password": "foo",
        "role_id": 2
      },
      {
        "id": 3,
        "roleId": 2,
        "email": "magalie@example.com",
        "password": "bar",
        "role_id": 2
      },
      {
        "id": 4,
        "roleId": 3,
        "email": "nyx@example.com",
        "password": "baz",
        "role_id": 3
      },
      {
        "id": 5,
        "roleId": 3,
        "email": "noctalie@example.com",
        "password": "fooz",
        "role_id": 3
      },
      {
        "id": 6,
        "roleId": 3,
        "email": "dayski@example.com",
        "password": "far",
        "role_id": 3
      }
    ]`

    /* ... */

    // ...plus tard alors que vous avez besoin d'afficher les noms de rôle...
    
    const users = await Users.findAll({
        where: {
            id: result.map(d => d.id)
        },
        include: {
          model: Roles,
          required: true
        }
    });

    users.forEach(async ({ Role }) => {
        console.log(JSON.stringify(Role.name, null, 2));
    });
    /*
    `"Administrateur"`
    `"Éditeur"`
    `"Éditeur"`
    `"Lecteur"`
    `"Lecteur"`
    `"Lecteur"`
    */
})();