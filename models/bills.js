'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bills.init({
    customerguid: DataTypes.STRING,
    RecLoc: DataTypes.STRING,
    SegSeqNbr: DataTypes.INTEGER,
    NbrOfPax: DataTypes.INTEGER,
    ArcIata: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    BookingDate: DataTypes.DATE,
    FlightDate: DataTypes.DATE,
    SegmentOrigin: DataTypes.STRING,
    SegmentDest: DataTypes.STRING,
    Base: DataTypes.DOUBLE,
    CurrencyBase: DataTypes.STRING,
    SV: DataTypes.DOUBLE,
    Status: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'bills',
  });
  return bills;
};