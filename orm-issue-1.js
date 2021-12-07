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
  const author = await Authors.findOne({
    where: { lastName: 'King' }
  })

  const result = await Books.findAll({
    where: { authorId: author.id },
  });

  // Résultat
  result.forEach((item) => {
    console.log(item.title)
  });
  /*
  The Shining
  The Dark Tower: The Gunslinger
  */
})();

E