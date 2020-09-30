import mongoose from 'mongoose';
import { dbUrl} from './env';

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
  .once('open', () => console.log('Connected to Mongo on ' + dbUrl))
  .on('error', (error : any) => {
    console.warn('Warning', error.toString());
  });

module.exports = connection;