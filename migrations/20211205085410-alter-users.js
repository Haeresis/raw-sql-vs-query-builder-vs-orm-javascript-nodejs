'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'birth_date', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true 
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'birth_date');
  }
};