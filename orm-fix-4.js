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
  const authorIds = [1, 2];
  const booksIds = {}

  const books = await Books.findAll({ 
      where: { author_id: authorIds }
  });
  books.forEach((book) => {
    booksIds[book.author_id] = booksIds[book.author_id] ? [...booksIds[book.author_id], book.id] : [book.id]
  })

  console.log(JSON.stringify(booksIds, null, 2));
  /*
  {       
    "1": [
      1,  
      2   
    ],    
    "2": [
      3   
    ]     
  }
  */
})();