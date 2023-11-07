'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    companyguid: DataTypes.STRING,
    userguid: DataTypes.STRING,
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    rolSuperior: DataTypes.STRING,
    nivel: DataTypes.STRING,
    activo: DataTypes.STRING,
    permisos: DataTypes.STRING,
    token: DataTypes.STRING,
    tokenType: DataTypes.STRING,
    roles: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};