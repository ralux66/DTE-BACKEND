'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerguid: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      nombreComercial: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      nrc: {
        type: Sequelize.STRING
      },
      tipoEstablecimiento: {
        type: Sequelize.STRING
      },
      tipoMoneda: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      codActividad: {
        type: Sequelize.STRING
      },
      descActividad: {
        type: Sequelize.STRING
      },
      departamento: {
        type: Sequelize.STRING
      },
      municipio: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      codEstableMH: {
        type: Sequelize.STRING
      },
      codEstable: {
        type: Sequelize.STRING
      },
      codPuntoVentaMH: {
        type: Sequelize.STRING
      },
      codPuntoVenta: {
        type: Sequelize.STRING
      },
      direccion: {
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
    await queryInterface.dropTable('customers');
  }
};