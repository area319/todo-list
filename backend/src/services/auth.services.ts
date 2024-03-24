import {User} from '../models/user.model'
import {IUser} from '../interfaces/user.interface'

export const saveUser = async(userData: IUser) => {
    let new_user = new User(userData);
    const save_res = await new_user.save();
    return save_res;
}

export const findUsersByEmail = async(email: string) => {
    let findUsers = await User.find({email: email});
    return findUsers;
}
