import mongoose from 'mongoose';
import logger from "./logger";
import { DB } from "./secrets";

// Build the connection string

const options = {
  connectTimeoutMS  : 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS   : 45000, // Close sockets after 45 seconds of inactivity
};

mongoose
  .connect("mongodb://127.0.0.1:27017/cshDatabase", options)
  .then(() => {
    logger.info('Mongoose connection done');
  })
  .catch((e:any) => {
    logger.info('Mongoose connection error');
    logger.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', (err: any) => {
  logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close().
    then((res)=> {
      logger.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
    });
});
