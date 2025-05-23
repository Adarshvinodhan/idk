import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
    type:DataTypes.STRING,
    allowNull:false
  },
  role:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"user"
  },
  refreshToken: {
    type:DataTypes.STRING,
  },
  lastLoggedIn:{
    type:DataTypes.DATE,
    allowNull:false
  },
}, {
  tableName: 'users',
  timestamps: true,
});

export const UserDetails = sequelize.define('UserDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'users', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  height: {
    type:DataTypes.INTEGER,
    allowNull:true
  },
  weight: {
    type:DataTypes.INTEGER,
    allowNull:true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img:{
    type:DataTypes.STRING,
    allowNull:true
  }
}, {
  tableName: 'user_details',
  timestamps: true,
});

User.hasOne(UserDetails, { foreignKey: 'userId', as: 'details' });
UserDetails.belongsTo(User, { foreignKey: 'userId', as: 'user' });
