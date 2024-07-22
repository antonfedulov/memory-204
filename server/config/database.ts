import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('memory_db', 'captain', 'Memory204!', {
  host: '185.65.247.78',
  port: 3306,
  dialect: 'mysql'
});