import { HTTP, URL } from "./http"

const ROUTE = '/api/medicos/medicos';

export const obtenerMedicos = async () => {   
    try {
      const response = await HTTP.GET(URL.URL_API + ROUTE);   
      if (!response.ok) {
        throw new Error('Error al obtener médicos');
      } else {
        return response.data.medicos; 
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      throw { message: error.message };
    }
  };
  

