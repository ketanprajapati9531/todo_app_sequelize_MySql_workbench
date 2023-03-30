const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const Task = require("./task");

const User = db.define(
  // model
  'User',
  {
    // objects
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // options
    timestamps: true,
    underscored: true,
  }
);



//User.hasMany(Todo, { foreignKey: 'user.id' });

module.exports = User;
/*

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
The name of the model ('User' in this case).
An object that defines the properties of the model (name, email, and password 
in this case).
An options object that defines additional options for the model 
(timestamps and underscored in this case).

timestamps:-
which is set to true and tells Sequelize to include createdAt and updatedAt 
fields in the model.

underscored:-
which is set to true and tells Sequelize to use snake_case naming for the 
fields in the model.


*/
