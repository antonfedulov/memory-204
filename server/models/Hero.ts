import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Hero extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
}

Hero.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    rank: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    tableName: 'heroes',
    sequelize
  }
);

export default Hero;