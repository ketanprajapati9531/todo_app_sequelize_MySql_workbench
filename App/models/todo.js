
const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./userModel');
const Todo = db.define(
    // model
    'Todo',
    {
      // objects
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_complete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:0,
      },
    
    },
    {
      // options
      timestamps: true,
      underscored: true,
    }
  );
  
  Todo.belongsTo(User, { foreignKey: 'user_id' });
  module.exports = Todo;