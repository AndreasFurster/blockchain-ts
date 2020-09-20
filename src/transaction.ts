import ITransaction from "./interfaces/Transaction";

export default class Transaction implements ITransaction {
  constructor(
    public from: string,
    public to: string,
    public amount: number,
  ) {

  }
}