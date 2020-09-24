const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./config/mongo.db');
const env = require('./config/env');

const transactions_routes = require('./api/transactions.routes');

// initialize express
const app = express();
module.exports = {};

// CORS headers
app.use(cors());

// bodyParser
app.use(bodyParser.json());

//Endpoints
app.get('/', (res: { send: (arg0: string) => void; }) => {
    res.send('Hello BlockChain')
  });
app.use('/api/v1', transactions_routes);

// Run server
app.listen(env.env.webPort, function () {
  console.log('Served on port ' + env.env.webPort)
});

module.exports = app;