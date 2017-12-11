const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const route = require('./routes/route');
require('./dbconnect');

const app = express();

// app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.use('/api', route);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8080);
