import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://api-meme-zendvn-01.herokuapp.com/api/',
    // baseURL: 'http://localhost:3000/',
    headers: {
        'accept': 'application/json,text/html,application/xhtml+xml,application/xml'
    }
});

export default axiosInstance;