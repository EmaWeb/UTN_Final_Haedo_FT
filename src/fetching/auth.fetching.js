import { HTTP, URL } from "./http"
const ROUTE = '/api/auth'
import Swal from 'sweetalert2';

export const login = async (usuario) => {
  try {
    const result = await HTTP.POST(URL.URL_API + ROUTE + '/login', usuario);
    if (result.ok) {
      localStorage.setItem('Token', String(result.data.token));
    } else {
      throw new Error('Credenciales incorrectas');
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registrar = async (usuario) => {
  try {
    const result = await HTTP.POST(URL.URL_API + ROUTE + '/register', usuario)
    if (!result.ok) {
      throw result
    }
  }
  catch (error) {
    throw { message: error.message }
  }
}


export const verificarToken = async () => {
  try {
    const token = localStorage.getItem('Token');

    if (!token) {
      throw new Error('Token no encontrado en localStorage');
    }
    const headers = new Headers();
    const result = await HTTP.GET(URL.URL_API + ROUTE + '/verify-token', { headers });

    headers.append('authorization', token);
    return result;
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    throw new Error(error.message);
  }
};


