import { Document, Model, model, Schema } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

type IUserDoc = IUser & Document

const UserSchema = new Schema({
    email: String,
    password: String,
    role: String,
}, { timestamps: true });

export interface UserDocument extends IUserDoc { }

export interface UserModel extends Model<UserDocument> { }

// ISSUE: Own every parameter and any missing dependencies

export default model<UserDocument>('User', UserSchema);
