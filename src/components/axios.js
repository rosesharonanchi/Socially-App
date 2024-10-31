import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
    headers: {
        Accept: 'application/json'
    }
})

export default instance