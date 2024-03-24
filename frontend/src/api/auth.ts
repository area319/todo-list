import axios from '%/utils/axios'

export const login = async (login_data: object) => {
    const res = await axios.post('/auth/login', login_data);
    return res.data;
}

export const signup = async (signup_data:object) => {
    const res = await axios.post('/auth/signup', signup_data);
    return res.data;
}