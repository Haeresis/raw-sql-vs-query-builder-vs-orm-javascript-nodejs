'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({ Roles }) {
      Users.hasOne(Roles, {
        constraints: false
      });
    }
  };

  Users.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roleId: {
      field: 'role_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { 
    sequelize,
    tableName: 'users', 
    indexes: [{
      name: 'email_idx',
      fields: ['email']
    }, {
      name: 'password_idx',
      fields: ['password']
    }],
    createdAt: false,
    updatedAt: false
  });

  return Users;
};