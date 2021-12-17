'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate({ Authors }) {
      Books.belongsTo(Authors, {
        foreignKey: { 
          name: 'author_id',
          allowNull: false
        }
      });
    }
  };

  Books.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authorId: {
      field: 'author_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalLanguage: {
      field: 'original_language',
      type: DataTypes.STRING(2),
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING(17),
      allowNull: false
    }
  }, { 
    sequelize,
    tableName: 'books', 
    indexes: [{
      name: 'title_idx',
      fields: ['title']
    }, {
      name: 'original_language_idx',
      fields: ['original_language']
    }, {
      name: 'isbn_idx',
      fields: ['isbn']
    }],
    createdAt: false,
    updatedAt: false
  });

  return Books;
};