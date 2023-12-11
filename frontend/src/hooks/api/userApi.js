import axiosInstance from "./axiosConfig";

export const getUserByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/user/search-email?email=${email}`);
    
    // Verifica si la respuesta tiene datos y devuelve el objeto correspondiente
    if (response && response.data) {
      return response.data;
    } else {
      // Maneja el caso en el que la respuesta no tenga datos
      console.error('La respuesta no contiene datos.');
      return null;
    }
  } catch (error) {
    // Maneja errores de la llamada a la API
    console.error('Error al llamar a la API:', error);
    return null;
  }
};
export const updateUser = async (updatedInfo, token) => {
  try {
    // Realizar la llamada PUT para actualizar la información del usuario
    const response = await axiosInstance.put('/user/update', updatedInfo, 
    {
      headers: { Authorization: `Bearer ${token}`}
    });
    console.log('Respuesta del servidor:', response.data);
  } catch (error) {
    // Manejar errores aquí
  console.error('Error updating user:', error);

  if (error.response) {
    // El servidor respondió con un estado diferente de 2xx
    console.log('Respuesta del servidor:', error.response.data);
    console.log('Estado HTTP:', error.response.status);
    console.log('Cabeza de respuesta:', error.response.headers);
  } else if (error.request) {
    // La solicitud fue hecha pero no se recibió respuesta
    console.log('No se recibió respuesta del servidor');
  } else {
    // Algo sucedió en la configuración de la solicitud que generó un error
    console.log('Error de configuración de la solicitud:', error.message);
  }

  throw error;
  }
};


