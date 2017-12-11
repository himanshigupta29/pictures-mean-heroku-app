var mongoose = require('mongoose');
// require('dotenv').config();

const MONGO_USER = process.env.MLAB_USER || "XXX-XXX-XXX";
const MONGO_USER_SECRET = process.env.MLAB_USER_SECRET || "XXX-XXX-XXX";

const mongoURL = 'mongodb://' + MONGO_USER + ':' + MONGO_USER_SECRET + '@ds129936.mlab.com:29936/picture-gallery';

var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
//  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(mongoURL, options);

// mongoose.connection.on('connected', () => {
//   console.log('connected to mongodb');
// });
// mongoose.connection.on('error', (error) => {
//   console.log("error in connection wth mongo", error);
// });
