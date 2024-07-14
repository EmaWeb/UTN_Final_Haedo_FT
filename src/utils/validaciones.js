  export const validateNombreApellido = (value) => {  
    if (!/^[a-zA-Z]+$/.test(value)) {
      return 'Solo se permiten letras';
    }
    return '';
  };
  export const validateApellido = (value) => {
    if (!/^[a-zA-Z]+$/.test(value)) {
      return 'Solo se permiten letras';
    }
    return '';
  };
  export const validateNombre = (value) => {
    if (!/^[a-zA-Z]+$/.test(value)) {
      return 'Solo se permiten letras';
    }
    return '';
  };
  
  export const validateDocumento = (value) => {
    if (!/^\d{0,8}$/.test(value)) {
      return 'Solo se permiten números, máximo 8 dígitos';
    }
    return '';
  };
  
  export const validateSexo = (value) => {
    if (!['M', 'F'].includes(value)) {
      return 'Selecciona un sexo válido';
    }
    return '';
  };
  
  export const validateDireccion = (value) => {
    if (value.length > 25) {
      return 'Máximo 25 caracteres';
    }
    return '';
  };
  
  export const validateTelefono = (value) => {
    if (!/^\d{0,15}$/.test(value)) {
      return 'Solo se permiten números, máximo 15 dígitos';
    }
    return '';
  };
  
  export const validateEmail = (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Formato de email inválido';
    }
    return '';
  };
  
  export const validatePassword = (value) => {
    if (value.length > 8) {
      return 'Máximo 8 caracteres';
    }
    return '';
  };
  