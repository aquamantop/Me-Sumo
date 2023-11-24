import axios from 'axios';

const instance = axios.create({
  baseURL: "http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/", // Reemplaza con tu base URL
  timeout: 5000, // Puedes ajustar el tiempo de espera según tus necesidades
});

export default instance;