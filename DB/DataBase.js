// Configurar conexión a MySQL
/* module.exports = connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'BillAirlines',
  }); */
const { Sequelize } = require("sequelize");

//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
// with password and options
module.exports = sequelize = new Sequelize('my_database', 'john', 'doe', {
  dialect: 'postgres'
});

 