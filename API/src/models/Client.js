import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'clients',
  timestamps: true
});

export { Client };
export default Client;