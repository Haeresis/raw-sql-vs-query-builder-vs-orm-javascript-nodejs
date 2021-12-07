'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Authors extends Model {
    static associate({ Books }) {
      Authors.hasMany(Books, {
        foreignKey: { 
          name: 'author_id',
          allowNull: false
        }
      });
    }
  };

  Authors.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { 
    sequelize,
    tableName: 'authors', 
    indexes: [{
      name: 'first_name_idx',
      fields: ['first_name']
    }, {
      name: 'last_name_idx',
      fields: ['last_name']
    }],
    createdAt: false,
    updatedAt: false
  });

  return Authors;
};