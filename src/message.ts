import IMessage from "./interfaces/IMessage";

export default class Message implements IMessage {
  public userId: string = '';
  public message: string = '';
  public hash: string = '';
  public previousHash: string = '';
  public signature: string = '';
  public index: number = 0;
  
  constructor(
  ) {

  }
}
