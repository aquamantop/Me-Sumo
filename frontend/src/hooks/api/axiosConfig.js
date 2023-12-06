import axios from 'axios';

const axiosInstance  = axios.create({
  baseURL: "http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/",
  timeout: 5000, 

});

export default axiosInstance ;