import React, { useState } from 'react';
import { login } from '../../fetching/auth.fetching';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../screens/login/Login.css';
import { useAuth } from '../../fetching/authContext';
import img1 from '../../utils/img/hero-bg.jpg'

const LoginScreen = () => {
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const { setAuthenticated, checkAuthentication } = useAuth();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const usuario = {
        email: event.target.email.value,
        password: event.target.password.value
      };

      const result = await login(usuario);

      if (result.ok && result.data && result.data.token) {
        const tokenData = result.data.token;
        if (tokenData.idPaciente && tokenData.email && tokenData.token) {
          const pacienteData = {
            idPaciente: tokenData.idPaciente,
            email: tokenData.email,
            token: tokenData.token,
            idRol: tokenData.idRol
          };
          localStorage.setItem('Token', JSON.stringify(pacienteData));
          setAuthenticated(true);
          checkAuthentication();
          setErrorText('');
          navigate('/home');
        } else {
          setErrorText('Datos del token incompletos.');
        }
      } else {
        setErrorText('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setErrorText(error.message);
    }
  };


  return (
    <div>
      <section id="hero" class="hero section light-background">
        <img src={img1} alt="Test" style={{ width: '100%', height: 'auto' }} />
        <div className="login-container">
          <form id="login" onSubmit={handleSubmit}>
            <h3>Iniciar sesión</h3>
            <div className="row-login">
              <div>
                <label htmlFor="email">Ingrese su email:</label>
                <input placeholder="joeDoe@gmail.com" id="email" name="email" />
              </div>
              <div>
                <label htmlFor="password">Ingrese su contraseña:</label>
                <input type="password" placeholder="******" id="password" name="password" />
              </div>
            </div>
            {errorText && <span style={{ color: 'red' }}>{errorText}</span>}
            <div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <a href="/register" class="btn btn-primary">Registrate</a>
                <button className="btn btn-primary" type="submit" >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginScreen;