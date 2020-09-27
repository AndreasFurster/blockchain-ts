import ITransaction from "./interfaces/ITransaction";

export default class Transaction implements ITransaction {
  constructor(
    public from: string,
    public to: string,
    public message: string,
  ) {

  }
}
