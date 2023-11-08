'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerguid: {
        type: Sequelize.STRING
      },
      
      RecLoc: {
        type: Sequelize.STRING
      },
      SegSeqNbr: {
        type: Sequelize.INTEGER
      },
      NbrOfPax: {
        type: Sequelize.INTEGER
      },
      ArcIata: {
        type: Sequelize.STRING
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      BookingDate: {
        type: Sequelize.DATE
      },
      FlightDate: {
        type: Sequelize.DATE
      },
      SegmentOrigin: {
        type: Sequelize.STRING
      },
      SegmentDest: {
        type: Sequelize.STRING
      },
      Base: {
        type: Sequelize.DOUBLE
      },
      CurrencyBase: {
        type: Sequelize.STRING
      },
      SV: {
        type: Sequelize.DOUBLE
      },
      Status: {
        type: Sequelize.CHAR
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
    await queryInterface.dropTable('bills');
  }
};