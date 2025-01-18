import { message } from 'antd';
import axios from 'axios';

const MainApiRequest = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

MainApiRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else if (localStorage.getItem('adminToken')) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('adminToken')}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

MainApiRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirect to login
            window.location.href = '/login';
        } else {
            // Show error message using antd message
            message.error(error.response.data.message || error.message);
        }
        return Promise.reject(error);
    },
);

export default MainApiRequest;
