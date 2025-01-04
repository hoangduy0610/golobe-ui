import axios from 'axios';
console.log(process.env.REACT_APP_API_URL )
const MainApiRequest = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default MainApiRequest;
