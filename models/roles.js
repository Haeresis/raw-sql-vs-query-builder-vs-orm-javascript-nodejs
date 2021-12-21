'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Roles extends Model {
		static associate({ Users }) {
			Roles.hasMany(Users, {
				foreignKey: { 
					name: 'role_id',
					allowNull: false
				}
			});
		}
	};

	Roles.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, { 
		sequelize,
		tableName: 'roles', 
		indexes: [{
			name: 'name_idx',
			fields: ['name']
		}],
		createdAt: false,
		updatedAt: false
	});

	return Roles;
};