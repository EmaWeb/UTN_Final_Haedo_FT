import { HTTP, URL } from "./http";
import Swal from 'sweetalert2';

const ROUTE = '/api/paciente';
export const obtenerIdPaciente = async (idPaciente) => {
    
    try {
        const response = await HTTP.GET(`${URL.URL_API}${ROUTE}/${idPaciente}`);
      
        if (!response.ok) {
            throw new Error('Error al obtener datos del paciente.');
        } else {
    
            return response.data; 
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

export const actualizarDatosPaciente = async (idPaciente, nuevosDatos) => { 
    try {
        const response = await HTTP.PUT(`${URL.URL_API}${ROUTE}/${idPaciente}`, nuevosDatos);      
        if (!response.ok) {
            throw new Error('Error al actualizar los datos del paciente');
        }     
        return response;        
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

export const obtenerPacientes = async () => {
    try {
      const response = await HTTP.GET(`${URL.URL_API}${ROUTE}`);
    
      if (!response) {
        throw new Error('Error al obtener pacientes');
      } else {    
        return response; 
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

  export const eliminarPaciente = async (idPaciente) => {

    try {
        const response = await HTTP.DELETE(`${URL.URL_API}${ROUTE}/${idPaciente}`);
        if (!response.ok) {
            throw new Error('Error al eliminar el paciente.');
        }
        return response.data;
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
  