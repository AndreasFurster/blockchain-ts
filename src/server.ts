import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { dbUrl, env } from './config/env';
import mongoose from 'mongoose'
import Message from './models/message.model';

import Block from './Block';
import BlockModel from './models/block.model';
import BlockChain from './BlockChain';
import BlockChainModel from './models/blockchain.model';

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

app.post('/messages', async (req, res) => {
  res.contentType('application/json');

  let message = await Message.create({
    _id: mongoose.Types.ObjectId(),
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
  });

  let newBlock = new Block();
  BlockModel.create({
    _id: mongoose.Types.ObjectId(),
    index: newBlock.index,
    hash: newBlock.hash,
    previousHash: newBlock.previousHash,
    nonce: newBlock.nonce,
    messages: [],
    key: newBlock.key,
    signature: newBlock.signature,
})
.then(block =>  {
      block.messages.push(message);
      block.save();
      res.status(200).send(block)
  });
});

// Run server
app.listen(env.webPort, () => {
  console.log('Served on port ' + env.webPort)
  let genesis = new Block();
  let newBlockChain = new BlockChain(genesis);

    BlockChainModel.find({}, (err, res) => {
      if (res.length > 0) {
        console.log('Blockchain already created:', res);
      } else {
        BlockChainModel.create({
          _id: mongoose.Types.ObjectId(),
          blocks: [...newBlockChain.blocks],
          difficulty: newBlockChain.difficulty,
        })
        .then(blockhain => {
          console.log(blockhain);
        })
      }
  });
});

module.exports = app;