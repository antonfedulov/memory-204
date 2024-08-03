import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface HeroAttributes {
  Id: string;
  Order: number;
  PIP: string;
  Rank: string;
  Description: string;
  Reward: string;
  Position: string;
  Photo: Buffer;
}

interface HeroCreationAttributes extends Optional<HeroAttributes, 'Id'> {}


class Hero extends Model<HeroAttributes, HeroCreationAttributes> implements HeroAttributes {
  public Id!: string;
  public Order!: number;
  public PIP!: string;
  public Rank!: string;
  public Description!: string;
  public Reward!: string;
  public Position!: string;
  public Photo!: Buffer;
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
    Title: {
    type: DataTypes.STRING,
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
