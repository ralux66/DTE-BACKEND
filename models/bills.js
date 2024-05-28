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
    //add
    NumeroControl: DataTypes.STRING, //"DTE-01-02075433-000000000000001"
    CodigoGeneracion: DataTypes.STRING, //"4B02E281-8EA3-48D6-7704-0E0014D42229"
    //end
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
    Status: DataTypes.CHAR,
    SubmitDte: DataTypes.DATE,
    BatchTransaction: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'bills',
  });
  return bills;
};