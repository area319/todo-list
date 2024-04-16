import axios from 'axios'

const axiosIns = axios.create({
    baseURL: 'http://localhost:3030/api',
    headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
   },
});

axiosIns.interceptors.request.use(async config => {
    const accessToken = localStorage.getItem("access_token");
    if (config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}` 
    }
    return config
});

export default axiosIns;
