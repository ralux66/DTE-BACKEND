'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logs.init({
    fecha_hora: DataTypes.DATE,
    nivel: DataTypes.STRING,
    origen: DataTypes.STRING,
    mensaje: DataTypes.STRING,
    datos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'logs',
  });
  return logs;
};