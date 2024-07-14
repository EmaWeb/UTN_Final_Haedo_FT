import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('Token');

    if (token) {
      try {
        const parsedData = JSON.parse(token);
        setAuthenticated(true);
        setUserId(parsedData.idPaciente);
        setUserRole(parsedData.idRol);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        setAuthenticated(false);
        setUserId(null);
        setUserRole(null);
      }
    } else {
      setAuthenticated(false);
      setUserId(null);
      setUserRole(null);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, userId, userRole, setAuthenticated, setUserId, checkAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
