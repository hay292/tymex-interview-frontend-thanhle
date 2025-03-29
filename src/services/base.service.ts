import axios, { InternalAxiosRequestConfig } from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5005',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    if (!request.params) {
      request.params = {};
    }

    request.baseURL = 'http://localhost:5005';

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default API;
