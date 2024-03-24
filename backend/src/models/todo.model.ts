import { Document, Model, model, Schema } from 'mongoose';
import { ITodo } from '../interfaces/todo.interface';
import IUserModel, { User } from './user.model';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export default interface ITodoModel extends ITodo, Document {

}

const TodoSchema = new Schema({
  author: Schema.ObjectId,
  title: String,
  description: String,
  deadline: Date,
  status: String
}, {
  timestamps: true
});

export const Todo: Model<ITodoModel> = model<ITodoModel>('Todo', TodoSchema);
