import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Hero extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
}

Hero.init(
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    PIP: {
      type: new DataTypes.TEXT('tiny'),
      allowNull: false
    },
    Rank: {
      type: new DataTypes.TEXT('tiny'),
      allowNull: false
    },
    Description: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    Reward: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    Position: {
      type: new DataTypes.TEXT,
      allowNull: false
    },
    Photo: {
      type: new DataTypes.BLOB('medium'),
      allowNull: false
    },
    Title : {
      type: new DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }
  },
  {
    tableName: 'heroes',
    sequelize
  }
);

export default Hero;
