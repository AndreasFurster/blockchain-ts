import IBlockChain from "../interfaces/blockchain";
import express from 'express';
import Transaction from "../transaction";

export default class MessageController {
  constructor(private blockchain: IBlockChain) {
    
  }

  public async getAllMessages(req: express.Request, res: express.Response) {
    console.log(this)
    let blocks = await this.blockchain.getBlocks()
    res.contentType('application/json');
    res.status(200).json(blocks);
  }

  public async createNewMessage(req: express.Request, res: express.Response) {
    const { from, to, message } = req.body
    let transaction = new Transaction(from, to, message)
    let block = this.blockchain.getNextBlock([transaction])
    let addedBlock = await this.blockchain.addBlock(block)

    res.contentType('application/json');
    res.status(200).send(addedBlock)
  }
}