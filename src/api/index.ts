import axios from 'axios';

export const api = axios.create({
  baseURL:
    'http://ec2-13-124-44-222.ap-northeast-2.compute.amazonaws.com:3000/api',
});
