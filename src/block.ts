import IBlock from "./interfaces/IBlock";
import ITransaction from "./interfaces/ITransaction";
import {Config} from "./config";
import crypto from "crypto";
let config: Config = require('../config.json');

export default class Block implements IBlock {
  constructor(
    public index?: number,
    public hash?: string,
    public previousHash?: string,
    public transactions?: ITransaction[],
    public signature?: string,
  ) {

  }

  get key() : string {
    return "" + JSON.stringify(this.transactions) + this.index + this.previousHash;
  }

  public addMessage(message: ITransaction) : void {
    console.log(message);
    this.transactions = [message]
  }

  private createSignature(hash: string) : void {
    const signer = crypto.createSign('RSA-SHA512');
    signer.update(hash);
    this.signature  = signer.sign(config.privateKey, 'hex');
  }

  public setHash(hash: string) {
    this.hash = hash;
    this.createSignature(hash);
  }
}
