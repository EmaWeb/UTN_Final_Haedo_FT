import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../utils/auth.utils';
import { useAuth } from '../fetching/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { obtenerIdPaciente, actualizarDatosPaciente } from '../fetching/paciente.fetching';
import PacienteForm from '../components/pacienteForm'; 
import Swal from 'sweetalert2';

const Navigation = () => {
  const { authenticated, setAuthenticated, userRole } = useAuth();
  const [showModal, setShowModal] = useState(false); 
  const [pacienteData, setPacienteData] = useState(null); 
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(setAuthenticated, navigate); 
  };

  const handleMisDatosClick = async () => {
    const pacienteToken = localStorage.getItem('Token');
    if (pacienteToken) {
      try {
        const parsedData = JSON.parse(pacienteToken);
        const detallesPaciente = await obtenerIdPaciente(parsedData.idPaciente);      
        setPacienteData(detallesPaciente);
        setShowModal(true);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };


  const handleCloseModal = () => setShowModal(false);

  const handleSave = async (updatedData) => {
    try {
      await actualizarDatosPaciente(updatedData.idPaciente, updatedData);
      setPacienteData(updatedData);
      setShowModal(false);
      Swal.fire({
        title: '¡Éxito!',
        text: 'Datos del paciente actualizados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        navigate('/home'); 
      });

    } catch (error) {     
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  return (
    <>
      <Navbar bg="light" expand="lg" sticky='top'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
            {!authenticated && (
              <>               
                <Nav.Link as={Link} to="/login">Ingresa</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrate</Nav.Link>
              </>
            )}            
            <Nav.Link as={Link} to="/about">Nosotros</Nav.Link>                   
          </Nav>
          {authenticated && (
            <Nav className="ml-auto">
              {userRole === 1 && (
                <Nav.Link as={Link} to="/administrar">Administrar Pacientes</Nav.Link>
              )}
              <NavDropdown
                title={<FontAwesomeIcon icon={faUser} />}
                id="user-nav-dropdown"
                align="end"
              >
                {userRole === 0 && (
                   <NavDropdown.Item onClick={handleMisDatosClick}>
                   <FontAwesomeIcon icon={faUser} /> Mis Datos
                 </NavDropdown.Item>
                )}        
                <NavDropdown.Item onClick={handleLogoutClick}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Mis Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pacienteData ? (
            <PacienteForm initialData={pacienteData} onSave={handleSave} onCancel={handleCloseModal} />
          ) : (
            <p>Cargando datos...</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
