require('dotenv').config({ path: './development.env' });
//const path = require('path');

/* dotenv.config({  
  //path: path.resolve('../config/' + process.env.NODE_ENV + '.env')
  path: path.resolve('../config/' + 'development' + '.env')
});
 */
const configuraionDB = {

  "development": {
    "username": "postgres",
    "password": "ragu77",
    "database": "SpiritAirlines",
    "host": "127.0.0.1",
    "port":"5432",    
    "dialect": "postgres",
    "use_env_variable": "",
    "dialectOptions": {
      "connectTimeout": "60000"
    }
  },
 /*  "production": {
    "username": "postgres",
    "password": "ragu77",
    "database": "SpiritAirlines",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "use_env_variable": "",
    "dialectOptions": {
      "connectTimeout": "60000"
    }
  }, */
 /*  "production": {
    "username": "kduoqdnxfolsgf",
    "password": "798c7a47dec4d94e2e64d577d6d33a0b151e80180022b65e386db919ab8a36da",
    "database": "d3kd8fofmpd2d0",
    "host": "ec2-34-237-41-95.compute-1.amazonaws.com",
    "dialect": "postgres",
    "port":"5432",
    "use_env_variable": "",   
    "dialectOptions": {
      "connectTimeout": "60000",
      "ssl": {
        "require": "false",
        "rejectUnauthorized": "false"
      }
    },
  } */
}

/* const configvalue = ()=>{
  console.log(path.resolve('../config/' + process.env.NODE_ENV + '.env'));
}
 */
module.exports = {
  configuraionDB,
  //configvalue,
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  AUTH_DTE: process.env.AUTH_DTE,
  LOTE_DTE: process.env.LOTE_DTE,
  RECEPCION_DTE: process.env.RECEPCION_DTE,
  FIRMADOR_LOCAL: process.env.FIRMADOR_LOCAL,
  DATABASE_URL: process.env.DATABASE_URL,
}