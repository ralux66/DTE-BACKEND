'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({ 
    customerguid: DataTypes.STRING,
    nombre: DataTypes.STRING,
    nombreComercial: DataTypes.STRING,
    nit: DataTypes.STRING,
    nrc: DataTypes.STRING,
    tipoEstablecimiento: DataTypes.STRING,
    tipoMoneda: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo: DataTypes.STRING,
    codActividad: DataTypes.STRING,
    descActividad: DataTypes.STRING,
    departamento: DataTypes.STRING,
    municipio: DataTypes.STRING,
    complemento: DataTypes.STRING,
    codEstableMH: DataTypes.STRING,
    codEstable: DataTypes.STRING,
    codPuntoVentaMH: DataTypes.STRING,
    codPuntoVenta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};