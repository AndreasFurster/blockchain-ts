import IMessage from "./interfaces/IMessage";

export default class Message implements IMessage {
  public userId: string = '';
  public from: string = '';
  public message: string = '';
  
  constructor(
  ) {

  }
}
