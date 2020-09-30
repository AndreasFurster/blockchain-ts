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
        
        let message = new Message
        message.userId = transaction.userId
        message.message = transaction.message
        message.from = user.name
        messages.push(message)
      })
    })

    res.contentType('application/json');
    res.status(200).json(messages);
  }

  public async createNewMessage(req: express.Request, res: express.Response) {
    const { userId, message, publicKey, signature } = req.body
    let transaction = new Transaction(userId, message)
    console.log(transaction);
    console.log(config);
    
    let block = this.blockchain.getNextBlock([transaction])
    // this.blockchain.verifySignature(block.hash, )
    let addedBlock = await this.blockchain.addBlock(block)

    res.contentType('application/json');
    res.status(200).send(addedBlock)
  }
}