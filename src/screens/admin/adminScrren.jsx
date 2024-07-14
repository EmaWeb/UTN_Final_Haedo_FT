
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { obtenerPacientes, obtenerIdPaciente, actualizarDatosPaciente, eliminarPaciente } from '../../fetching/paciente.fetching';
import { useNavigate } from 'react-router-dom';
import PacienteForm from '../../components/pacienteForm';
import Swal from 'sweetalert2';
import '../../screens/admin/admin.css';

const PatientList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [pacienteData, setPacienteData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const result = await obtenerPacientes();
        setPacientes(result.data.paciente);
      } catch (error) {
        setErrorText('Error al obtener los pacientes.');
      }
    };

    fetchPacientes();
  }, []);

  const handleEdit = async (paciente) => {
    if (paciente) {
      try {
        const detallesPaciente = await obtenerIdPaciente(paciente.idPaciente);
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
    } else {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleSave = async (nuevosDatos) => {
    try {
      await actualizarDatosPaciente(nuevosDatos.idPaciente, nuevosDatos);
      const datosActualizados = await obtenerIdPaciente(nuevosDatos.idPaciente);
      setPacientes(pacientes.map(p => p.idPaciente === datosActualizados.paciente.idPaciente ? datosActualizados.paciente : p));
      setShowModal(false);
      Swal.fire({
        title: '¡Éxito!',
        text: 'Datos del paciente actualizados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      setSelectedPaciente(null);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar los datos del paciente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleDelete = async (idPaciente) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Vas a inactivar al paciente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, inactivar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await eliminarPaciente(idPaciente);
        const result = await obtenerPacientes();
        setPacientes(result.data.paciente);
        Swal.fire({
          title: 'Eliminado!',
          text: 'El paciente ha sido inactivado.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate('/administrar');
        });

      } catch (error) {
        setErrorText('Error al inactivar el paciente.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPaciente(null);
  };

  const getSexo = (sexo) => {
    return sexo === 'F' ? 'Femenino' : 'Masculino';
  };

  const getEstado = (estado) => {
    return estado == 1 ? 'Activo' : 'Inactivo';
  };
  return (
    <div className="patient-list-container">
      {errorText && <p style={{ color: 'red' }}>{errorText}</p>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Sexo</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(paciente => (
            <tr key={paciente.idPaciente}>
              <td>{paciente.idPaciente}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
              <td>{paciente.documento}</td>
              <td>{paciente.telefono}</td>
              <td>{paciente.email}</td>
              <td>{getSexo(paciente.sexo)}</td>
              <td>{paciente.direccion}</td>
              <td>{getEstado(paciente.estado)}</td>             
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(paciente)}
                  className="action-btn"
                  disabled={paciente.idRol === 1}
                >
                  Editar
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(paciente.idPaciente)}
                  className="action-btn"
                  disabled={paciente.idRol === 1}
                >
                  Inactivar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Editar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pacienteData && (
            <PacienteForm
              initialData={pacienteData}
              onSave={handleSave}
              onCancel={handleCloseModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PatientList;
