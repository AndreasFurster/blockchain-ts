import IBlock from "./interfaces/IBlock";
import ITransaction from "./interfaces/ITransaction";
import {Config} from "./config";
import crypto from "crypto";
let config: Config = require('../config.json');

export default class Block implements IBlock {
  constructor(
    public index: number = 0,
    public hash: string = '',
    public previousHash: string = '',
    public nonce: number = 0,
    public transactions: ITransaction[] = [],
    public signature: string = ''
  ) {

  }

  get key() : string {
    return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
  }

  public addTransaction(transaction: ITransaction) : void {
    this.transactions = [...this.transactions, transaction]
  }

  private createSignature(hash: string) : void {
    const signer = crypto.createSign('RSA-SHA512');
    signer.update('hello');
    this.signature  = signer.sign(config.privateKey, 'hex');
  }

  public setHash(hash: string) {
    this.hash = hash;
    this.createSignature(hash);
  }
}
