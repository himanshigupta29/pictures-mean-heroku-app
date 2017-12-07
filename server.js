const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// const route = require('./routes/route');

const MONGO_USER = process.env.MLAB_USER || "XXX-XXX-XXX";
const MONGO_USER_SECRET = process.env.MLAB_USER_SECRET || "XXX-XXX-XXX";

const mongoURL = 'mongodb://' + MONGO_USER + ':' + MONGO_USER_SECRET + '@ds129936.mlab.com:29936/picture-gallery';

mongoose.connect(mongoURL);

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb');
});
mongoose.connection.on('error', (error) => {
  console.log("error in connection wth mongo", error);
});

const app = express();

// app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.use('/api', route);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8080);
