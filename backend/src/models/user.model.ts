import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export default interface IUserModel extends IUser, Document {

}

// ISSUE: Own every parameter and any missing dependencies
const UserSchema = new Schema({
    email: String,
    password: String,
}, { timestamps: true });

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
