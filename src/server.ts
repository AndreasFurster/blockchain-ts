import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { dbUrl, env } from './config/env';
import BlockChain from './blockchain';
import MessageController from './controllers/messageController';

(async () => {
  const mongodb = require('./config/mongo.db');

  // initialize express
  const app = express();
  module.exports = {};

  // CORS headers
  app.use(cors());

  // bodyParser
  app.use(bodyParser.json());

  let blockchain = await BlockChain.load();  
  let messageController = new MessageController(blockchain)

  //Endpoints
  app.get('/messages', (req, res) => messageController.getAllMessages(req, res));
  app.post('/messages', (req, res) => messageController.createNewMessage(req, res));

  // Run server
  app.listen(env.webPort, () => {
    console.log('Listening on http://localhost:' + env.webPort)

  });

  module.exports = app;
})()