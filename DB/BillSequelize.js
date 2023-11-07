
// Crear modelo de datos
/* const { Sequelize } = require("sequelize"); */
//const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const BillTable = sequelize.define("Bills",
    {
      recLoc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      segSeqNbr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nbrOfPax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arcIata: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      flightDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      segmentOrigin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      segmentDest: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

      },
      base: {
        type: DataTypes.DOUBLE,
        allowNull: 0,
      },
      currencyBase: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sv: {
        type: DataTypes.DOUBLE,
        allowNull: 0,
      },
    },
    {
      timestamps: true,
      underscored: true,
    },

  );
  return BillTable;
};