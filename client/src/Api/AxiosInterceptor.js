import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
});

const requestHandler = request => {
    return request;
};

const responseHandler = response => {
    return response.data;
};

const errorHandler = error => {
    return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

axiosInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default axiosInstance;