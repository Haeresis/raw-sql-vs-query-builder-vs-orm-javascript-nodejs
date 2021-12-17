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
  const result = await Books.findAll();
  console.log(JSON.stringify(result, null, 2));

  /* ... */

  // ...plus tard alors que vous avez besoin d'afficher les noms d'auteurs...

  result.forEach(async (book) => {
    const { Author } = await Books.findOne({
      where: { id: book.id },
      include: {
        model: Authors,
        required: true
      }
    })
    console.log(JSON.stringify(Author.firstName + ' ' + Author.lastName, null, 2));
  })
})();