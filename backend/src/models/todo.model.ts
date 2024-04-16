import { Document, Model, model, Schema } from 'mongoose'
import { ITodo } from '../interfaces/todo.interface'

type ITodoDoc =  ITodo & Document;

const TodoSchema = new Schema({
  author: Schema.ObjectId,
  title: String,
  description: String,
  deadline: String,
  status: String,
  completeDate: Date
}, {
  timestamps: true
});

export interface TodoDocument extends ITodoDoc{};

export interface TodoModel extends Model<TodoDocument> { }

export default model<TodoDocument>('Todo', TodoSchema);
