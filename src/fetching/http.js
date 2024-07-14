import Swal from 'sweetalert2';

export const HTTP = {
  GET: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Errorrrrr en la solicitud GET');
        }
        return { ok: true, data: result };
      } else {
        const text = await response.text();
        throw new Error(`Expected JSON but received HTML: ${text}`);
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
  },
  POST: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Error en la solicitud POST');
        }
        return { ok: true, data: result };
      } else {
        const text = await response.text();
        throw new Error(`Expected JSON but received HTML: ${text}`);
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
  },
  PUT: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Error en la solicitud PUT');
        }
        return { ok: true, data: result };
      } else {
        const text = await response.text();
        throw new Error(`Expected JSON but received HTML: ${text}`);
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
  }, DELETE: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Error en la solicitud DELETE');
        }
        return { ok: true, data: result };
      } else {
        const text = await response.text();
        throw new Error(`Expected JSON but received HTML: ${text}`);
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
  }
};

export const URL = {
  URL_API: 'http://localhost:4040',
};

