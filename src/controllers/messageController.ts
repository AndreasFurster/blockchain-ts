import IBlockChain from "../interfaces/blockchain";
import express from 'express';
import Transaction from "../transaction";
import IMessage from "../interfaces/IMessage";
import IBlock from "../interfaces/IBlock";
import ITransaction from "../interfaces/ITransaction";
import Message from "../message";
import { Config } from "../config";
let config: Config = require('../../config.json');

export default class MessageController {
  constructor(private blockchain: IBlockChain) {
    
  }

  public async getAllMessages(req: express.Request, res: express.Response) {
    let blocks = await this.blockchain.getBlocks()
    let messages: IMessage[] = []

    blocks.map((block: IBlock) => {
      block.transactions?.map((transactions: any) => {
        // TODO: Strongly typed?
        const transaction = transactions[0]
        
        let user = config.users.find(user => user.userId == transaction.userId)

        if(user === undefined) {
          console.log("Could not find user for inserted userId")
          return
        }
        if (block.hash && block.previousHash && block.index && block.signature) {
          let message = new Message
          message.userId = transaction.userId
          message.message = transaction.message
          message.index = block.index
          message.hash = block.hash
          message.previousHash = block.previousHash
          message.signature = block.signature
          messages.push(message)
        }
      })
    })

    res.contentType('application/json');
    res.status(200).json(messages);
  }

  public async createNewMessage(req: express.Request, res: express.Response) {
    const { userId, message, signature } = req.body
    let transaction = new Transaction(userId, message)
    console.log(transaction);
    
    let foundUser = config.users.find(user => user.userId === userId);
    
    let block = this.blockchain.getNextBlock([transaction], signature)
    if (foundUser?.publicKey) {
      let valid = this.blockchain.verifySignature(message, foundUser.publicKey, signature);
      if (valid) {
        let addedBlock = await this.blockchain.addBlock(block)
  
        res.contentType('application/json');
        res.status(200).send(addedBlock)
      } else {
        res.status(401).send('Not valid')
      }
    }  
  }
}