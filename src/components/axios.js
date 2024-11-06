import axios from 'axios';

const instance = axios.create({
     baseURL: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api`,
     headers: {
          "Content-Type": 'application/json'
     }
})

export default instance