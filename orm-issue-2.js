const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('raw_builder_orm', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Authors = require('./models/authors.js')(sequelize, DataTypes);
const Books = require('./models/books.js')(sequelize, DataTypes);
const Roles = require('./models/roles.js')(sequelize, DataTypes);
const Users = require('./models/users.js')(sequelize, DataTypes);

const models = { Authors, Books, Roles, Users };
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

(async function () {
  const result = await Authors.findOne({
    where: { lastName: 'King' },
    attributes: [],
    include: {
      model: Books,
      attributes: [Books.rawAttributes.title.field],
      required: true
    }
  });

  // Résultat
  console.log(JSON.stringify(result, null, 2));
  /*
  {
    "Books": [
      {
        "title": "The Shining"
      },
      {
        "title": "The Dark Tower: The Gunslinger"
      }
    ]
  }
  */

  result.Books.forEach((item) => {
    console.log(JSON.stringify(item, null, 2));
  });
  /*
  {
    "title": "The Shining"
  }
  {
    "title": "The Dark Tower: The Gunslinger"
  }
  */
})();