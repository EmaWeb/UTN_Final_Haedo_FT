import Swal from 'sweetalert2';

export const handleLogout = async (setAuthenticated, navigate) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar'
  });
  if (result.isConfirmed) {
    try {
      const tokenActual = localStorage.getItem('Token');
      if (tokenActual) {
        localStorage.removeItem('Token');
      }
      const detallesPaciente = localStorage.getItem('detallesPaciente');
      if (detallesPaciente) {
        localStorage.removeItem('detallesPaciente');
      }
      setAuthenticated(false);
      navigate('/login');      
      Swal.fire(
        'Cerrado!',
        'Has cerrado sesión exitosamente.',
        'success'
      );
    } catch (error) {
      Swal.fire('Error', 'Error al intentar cerrar sesión.', 'error');
    }
  }
};
