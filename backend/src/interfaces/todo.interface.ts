import { ObjectId } from 'mongodb';
import User from '../models/user.model';

export interface ITodo {
  author: ObjectId,
  title: string,
  deadline: Date,
  status: string,
}
