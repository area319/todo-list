require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  port: process.env.APP_PORT || 5050,

  jwtSecret: "This is area",

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  salt: parseInt(process.env.SALT || '100'),

  api: {
    prefix: '/api',
  },
};
