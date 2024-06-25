import axios from 'axios'

const userApi = axios.create({
    baseURL: "http://localhost:3006/api/user",
    headers: {
        'Content-Type': 'application/json',
    }
})

export const api = axios.create({
    baseURL: "http://localhost:3006/api/",
    headers: {
        // 'Content-Type': 'multipart/form-data',
    }
})

api.interceptors.request.use(
    config => {
        let token;
        sessionStorage.getItem('admintoken') ? token =  sessionStorage.getItem('admintoken') :  sessionStorage.getItem('token')// Get the token from local storage
        if (token) {
            config.headers['Authorization'] = `Token ${token}`; // Attach token to headers
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const register = async(authDetail) => {
    const response = await userApi.post('/create-user/', authDetail)
    if (!response.status === 201){
        throw{message: response.message, status: response.status,} // eslint-disable-line
    }
    return response
}

export const login = async(authDetail) => {
    const response = await userApi.post('/token/', authDetail)
    if (!response.status === 200) {
            throw{message: response.message, status: response.status,} // eslint-disable-line
            }
    const data = await response.data;
            if (data.token) {
                sessionStorage.setItem("token", data.token);
            }
        return response;
}

export const adminLogin = async(authDetail) => {
    const response = await userApi.post('/token/', authDetail)
    if (!response.status === 200) {
            throw{message: response.message, status: response.status,} // eslint-disable-line
            }
    const data = await response.data;
            if (data.token) {
                sessionStorage.setItem("admintoken", data.token);
            }
        return response;
}

export const setAdminTokenToLocal = async(authToken) => {
const response = await userApi.get('/token-check/', {
        headers: { 'Authorization' : `Token ${authToken}`}
         })
        // console.log(response)
        if (!response.status === 200) {
            throw{message: response.data, status: response.status} // eslint-disable-line
            }
        if (response.status ===200) {
            sessionStorage.setItem("admintoken", authToken);
            return {data:response.data.detail, status: response.status}
        }

    
   
}

export const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.getItem("admintoken") && sessionStorage.removeItem("admintoken");
    window.location.reload();
}