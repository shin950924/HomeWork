import axios from 'axios';
let instance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 100000,
});

export default instance;
