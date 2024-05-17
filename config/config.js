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
  "production": {
    "username": "gugrxqqxwxxrqp",
    "password": "d577c6bb6d49b68d78000f3950dd135ad8ce06172f03acf45aa0aedca7a15745",
    "database": "d248b7uf1r9fvc",
    "host": "ec2-44-215-176-210.compute-1.amazonaws.com",
    "dialect": "postgres",
    "port":"5432",
    "use_env_variable": "",
    "dialectOptions": {
      "connectTimeout": "60000"
    }
  }
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
}