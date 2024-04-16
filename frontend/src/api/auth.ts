import * as authPropType from '../types/propTypes/auth-prop.type'
import axios from '../utils/axios'

export const login = async (loginData: authPropType.loginPropType) => {
    const res = await axios.post('/auth/login', loginData);
    return res.data;
}

export const signup = async (signupData:authPropType.signupPropType) => {
    const res = await axios.post('/auth/signup', signupData);
    console.log(res);
    return res.data;
}

export const resetPassword = async (resetData: authPropType.resetPasswordPropTypes) => {
    const res = await axios.put('/auth/reset-password', resetData);
    console.log(res.data);
    return res.data;
}

export const getAllUserData = async () => {
    const allUserDataRes = await axios.get('/auth/get-all-user-data');
    if(allUserDataRes.data.message == 'Success') {
        return allUserDataRes.data.data;
    } else {
        return "Didn't get it.";
    }
}

export const deleteUser = async(deleteUserId: string) => {
    const deleteRes = await axios.delete('/auth/deleteUser/' + deleteUserId);
    if(deleteRes.data.message = 'Success') {
        return deleteRes.data.data;
    } else {
        return "Didn't delete";
    }
}
