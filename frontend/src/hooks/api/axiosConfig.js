import axios from 'axios';

const axiosInstance  = axios.create({
  baseURL: "http://ec2-107-21-182-26.compute-1.amazonaws.com:8090/", // Reemplaza con tu base URL
  timeout: 5000, // Puedes ajustar el tiempo de espera según tus necesidades
  //baseURL: "http://localhost:8090/", // Reemplaza con tu base URL
});

const getAccessToken = () => {
  // Lógica para obtener el token de acceso, por ejemplo, desde el almacenamiento local
  return localStorage.getItem("accessToken");
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance ;