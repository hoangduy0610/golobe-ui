import { message } from 'antd';
import axios from 'axios';

const AdminApiRequest = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

AdminApiRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

AdminApiRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirect to login
            window.location.href = '/admin/login';
        } else {
            // Show error message using antd message
            // message.error(error.message);
            return Promise.resolve(error.response);
        }
        return Promise.reject(error);
    },
);

export default AdminApiRequest;
