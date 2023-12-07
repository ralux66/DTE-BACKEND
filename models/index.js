'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const config = require('../config/config');
const env = config.NODE_ENV.trim() || 'development';
let configDB = {};
//SWITCH BASE DE DATOS PRODUCCION - DEV
switch (env) {
  case 'development':
    configDB = config.configuraionDB.development;
  case 'production':
    configDB = config.configuraionDB.production;
    break;
  default:
    break;
}
//const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (configDB.use_env_variable) {
  sequelize = new Sequelize(process.env[configDB.use_env_variable], configDB);
} else {
  sequelize = new Sequelize(configDB.database, configDB.username, configDB.password, configDB);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
