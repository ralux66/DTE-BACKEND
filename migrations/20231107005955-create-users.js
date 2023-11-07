'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyguid: {
        type: Sequelize.STRING
      },
      userguid: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      rolSuperior: {
        type: Sequelize.STRING
      },
      nivel: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.STRING
      },
      permisos: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      tokenType: {
        type: Sequelize.STRING
      },
      roles: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};