import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { env } from './config/env';
import mongoose from 'mongoose'
import Message from './models/message.model';

const mongodb = require('./config/mongo.db');

// initialize express
const app = express();
module.exports = {};

// CORS headers
app.use(cors());

// bodyParser
app.use(bodyParser.json());

//Endpoints
app.get('/messages', (req, res) => {
  res.contentType('application/json');
  Message.find({})
      .then((messages) => {
      res.status(200).json(messages);
  })
});

app.post('/messages', (req, res) => {
  res.contentType('application/json');
  Message.create({
      _id: mongoose.Types.ObjectId(),
      from: req.body.from,
      to: req.body.to,
      message: req.body.message,
  })
  .then(message => res.status(200).send(message))
});

// Run server
app.listen(env.webPort, function () {
  console.log('Served on port ' + env.webPort)
});

module.exports = app;