import IBlock from "./interfaces/IBlock";
import ITransaction from "./interfaces/ITransaction";
import Crypto, {Signer} from "crypto";
import {TextEncoder} from "util";
import {Config} from "./config";
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

  private createSignature() : void {
    let signature = Crypto.sign(null, Buffer.from(this.hash), config.privateKey);
    this.signature = Buffer.from(signature).toString('base64');

    console.log(this.signature);
  }

  public setHash(hash: string) {
    this.createSignature();
    this.hash = hash
  }
}
