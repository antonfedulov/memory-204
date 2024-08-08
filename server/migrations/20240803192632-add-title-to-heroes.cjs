'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('heroes', 'Title', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('heroes', 'Title');
  }
};