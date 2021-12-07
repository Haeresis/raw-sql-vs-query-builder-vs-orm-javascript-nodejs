module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'magalie.lesieur@example.com',
      password: 'fooz'
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { email: 'magalie.lesieur@example.com' }, {});
  }
};