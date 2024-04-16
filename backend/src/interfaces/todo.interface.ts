import { ObjectId } from 'mongodb'

export interface ITodo {
  author: ObjectId,
  title: string,
  deadline: string,
  status: string,
  completeDate: Date
}
