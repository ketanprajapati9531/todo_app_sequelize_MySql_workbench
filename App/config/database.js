const { Sequelize } = require('sequelize');

const db = new Sequelize('myapp2', 'root', 'ketan@5801', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = db;



/*

The host property specifies the host of the SQL database, which is 'localhost' 
in this case. The dialect property specifies the type of SQL database being 
used, which is 'mysql' in this case.

*/




