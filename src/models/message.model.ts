import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
    _id: ObjectId
    from: string; 
    to: string;
    message: string;
  };
  
  export const MessageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: String,
    to: String,
    message: String,
  }, {
      timestamps: true,
  });
  
  const Message = mongoose.model<IMessage>('Message', MessageSchema);
  export default Message;