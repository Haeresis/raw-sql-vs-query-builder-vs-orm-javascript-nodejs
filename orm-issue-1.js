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
  console.log(JSON.stringify(author, null, 2));
  /*
  {
    "id": 1,
    "firstName": "Stephen",
    "lastName": "King",
    "BookId": null
  }
  */
 
  result.forEach((item) => {
    console.log(JSON.stringify(item, null, 2));
  });
  /*
  {
    "id": 1,
    "authorId": 1,
    "title": "The Shining",
    "originalLanguage": "EN",
    "isbn": "978-0307743657",
    "author_id": 1
  }
  {
    "id": 2,
    "authorId": 1,
    "title": "The Dark Tower: The Gunslinger",
    "originalLanguage": "EN",
    "isbn": "978-0-937986-50-9",
    "author_id": 1
  }
  */
})();