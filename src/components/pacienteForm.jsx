
import React, { useState, useEffect } from 'react';
import '../screens/paciente/pacientes.css';
import {
  validateNombreApellido,
  validateDocumento,
  validateDireccion,
  validateTelefono,
  validateEmail,
  validateSexo,
} from '../utils/validaciones';

const PacienteForm = ({ initialData, onSave, onCancel }) => {
  //const [errorText, setErrorText] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    direccion: '',
    telefono: '',
    sexo: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData && initialData.paciente) {
      setFormData(initialData.paciente);
    }
  }, [initialData]);

  const validateForm = (field, value) => {
    let error = '';
    switch (field) {
      case 'nombre':
      case 'apellido':
        error = validateNombreApellido(value);
        break;
      case 'documento':
        error = validateDocumento(value);
        break;
      case 'direccion':
        error = validateDireccion(value);
        break;
      case 'telefono':
        error = validateTelefono(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'sexo':
        error = validateSexo(value);
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : Number(value); // Convertir a número si es necesario

    setFormData(prevState => ({
      ...prevState,
      [name]: name === "estado" ? numericValue : value // Solo convertir a número para "estado"
    }));

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateForm(name, name === "estado" ? numericValue : value) // Validar correctamente
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    let isValid = true;

    for (let field in formData) {
      const error = validateForm(field, formData[field]);
      if (error) {
        isValid = false;
      }
      errors[field] = error;
    }

    setFormErrors(errors);

    if (isValid) {
      onSave(formData);
    }
  };

  return (
    <div className="paciente-form">
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
        />
        {formErrors.nombre && <span style={{ color: 'red' }}>{formErrors.nombre}</span>}

        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleInputChange}
          placeholder="Apellido"
        />
        {formErrors.apellido && <span style={{ color: 'red' }}>{formErrors.apellido}</span>}

        <label>Documento</label>
        <input
          type="text"
          name="documento"
          value={formData.documento}
          onChange={handleInputChange}
          placeholder="Documento"
        />
        {formErrors.documento && <span style={{ color: 'red' }}>{formErrors.documento}</span>}

        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          placeholder="Dirección"
        />
        {formErrors.direccion && <span style={{ color: 'red' }}>{formErrors.direccion}</span>}

        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          placeholder="Teléfono"
        />
        {formErrors.telefono && <span style={{ color: 'red' }}>{formErrors.telefono}</span>}

        <label>Sexo:</label>
        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleInputChange}
        >
          <option value="">Seleccionar</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        {formErrors.sexo && <span style={{ color: 'red' }}>{formErrors.sexo}</span>}

        <label>Estado:</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleInputChange}
        >
          <option value="">Seleccionar</option>
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>

        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          <button type="button" className="btn btn-danger" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default PacienteForm;

