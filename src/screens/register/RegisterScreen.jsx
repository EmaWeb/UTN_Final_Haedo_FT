import React, { useState } from 'react';
import { registrar } from '../../fetching/auth.fetching';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../register/Register.css';
import img1 from '../../utils/img/hero-bg.jpg'
import {
  validateNombreApellido,
  validateDocumento,
  validateSexo,
  validateDireccion,
  validateTelefono,
  validateEmail,
  validatePassword,
} from '../../utils/validaciones';

const RegisterScreen = () => {
  const [errorText, setErrorText] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    sexo: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    let error = '';
    switch (name) {
      case 'nombre':
      case 'apellido':
        error = validateNombreApellido(value);
        break;
      case 'documento':
        error = validateDocumento(value);
        break;
      case 'sexo':
        error = validateSexo(value);
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
      case 'password':
        error = validatePassword(value);
        break;
      default:
        break;
    }

    if (error) {
      setFormErrors({ ...formErrors, [name]: error });
    } else {
      const { [name]: removedError, ...rest } = formErrors;
      setFormErrors(rest);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      const usuario = {
        ...formData,
        idrol: 2,
      };
      try {
        await registrar(usuario);
        setErrorText('');
        navigate('/login');
      } catch (error) {
        setErrorText(error.message);
      }
    } else {
      setErrorText('Por favor, corrige los errores en el formulario');
    }
  };

  return (
    <div>
      <section id="hero" class="hero section light-background">
        <img src={img1} alt="Test" style={{ width: '100%', height: 'auto' }} />

        <div className="register-container">


          <form onSubmit={handleSubmit}>
            <h3>Registro</h3>
            <div className="row" id='register'>
              <div className="col-md-5">
                <label className="control-label" htmlFor="nombre">Ingrese su nombre:</label>
                <input
                  placeholder="Nombre"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {formErrors.nombre && <span style={{ color: 'red' }}>{formErrors.nombre}</span>}
              </div>
              <div className="col-md-5">
                <label className="control-label" htmlFor="apellido">Ingrese su apellido:</label>
                <input
                  placeholder="Apellido"
                  id="apellido"
                  name="apellido"
                  className="form-control"
                  value={formData.apellido}
                  onChange={handleChange}
                />
                {formErrors.apellido && <span style={{ color: 'red' }}>{formErrors.apellido}</span>}
              </div>
              <div className="col-md-5">
                <label className="control-label" htmlFor="documento">Ingrese su documento:</label>
                <input
                  placeholder="Documento"
                  id="documento"
                  name="documento"
                  className="form-control"
                  value={formData.documento}
                  onChange={handleChange}
                />
                {formErrors.documento && <span style={{ color: 'red' }}>{formErrors.documento}</span>}
              </div>
              <div className="col-md-5">
                <label className="control-label" htmlFor="sexo">Ingrese su sexo:</label>
                <select
                  id="sexo"
                  name="sexo"
                  className="form-control"
                  value={formData.sexo}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
                {formErrors.sexo && <span style={{ color: 'red' }}>{formErrors.sexo}</span>}
              </div>
            </div>
            <div className="row" id='register'>
              <div className="col-md-5">
                <label htmlFor="direccion">Ingrese su direccion:</label>
                <input
                  placeholder="Direccion"
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  value={formData.direccion}
                  onChange={handleChange}
                />
                {formErrors.direccion && <span style={{ color: 'red' }}>{formErrors.direccion}</span>}
              </div>
              <div className="col-md-5">
                <label className="control-label" htmlFor="telefono">Ingrese su telefono:</label>
                <input
                  placeholder="Telefono"
                  id="telefono"
                  name="telefono"
                  className="form-control"
                  value={formData.telefono}
                  onChange={handleChange}
                />
                {formErrors.telefono && <span style={{ color: 'red' }}>{formErrors.telefono}</span>}
              </div>
              <div className="col-md-5">
                <label className="control-label" htmlFor="email">Ingrese su email:</label>
                <input
                  placeholder="joeDoe@gmail.com"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
              </div>
              <div className="col-md-5">
                <label className="control-label" htmlFor="password">Ingrese su contraseña:</label>
                <input
                  type="password"
                  placeholder="******"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
              </div>
            </div>
            {errorText && <span style={{ color: 'red' }}>{errorText}</span>}
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">Registrar</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );

}

export default RegisterScreen;
