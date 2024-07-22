import { serve } from 'bun';
import { sequelize } from './config/database';
import app from './app';
// import router from './routes';

// const User = require('./models/User');

const startServer = async () => {
  try {
    
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync();
    console.log('Database & tables created!');

    serve({
        fetch: app.fetch,
        port: 3000,
    });

    console.log('Server is running on port 3000');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

startServer();