import mongoose from 'mongoose'

// Build the connection string

const options = {
  connectTimeoutMS  : 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS   : 45000, // Close sockets after 45 seconds of inactivity
};
console.log(process.env.DB_PATH);
mongoose
  .connect('mongodb://'+process.env.DB_SERVER_IP + ':' + process.env.DB_PORT||"12000" + '/' + process.env.DB_NAME||"myDb", options)
  .then((res) => {
    console.log('Mongoose default connection open');
  })
  .catch((err:any) => {
    console.log('Mongoose default connection error:', err);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {

});

// If the connection throws an error
mongoose.connection.on('error', (err: any) => {
  console.log('Mongoose default connection error:', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close().
    then((res)=> {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
    });
});
