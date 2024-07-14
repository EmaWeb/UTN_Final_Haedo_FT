import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { obtenerPacientes, actualizarDatosPaciente } from '../../fetching/paciente.fetching';
import '../../screens/admin/admin.css';

const PatientList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorText, setErrorText] = useState('');

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

  const handleEdit = (paciente) => {
    setSelectedPaciente(paciente);
    setShowModal(true);
  };


  const handleDelete = async (idPaciente) => {
    try {
      await eliminarPaciente(idPaciente);
      setPacientes(pacientes.filter(paciente => paciente.idPaciente !== idPaciente));
    } catch (error) {
      setErrorText('Error al eliminar el paciente.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPaciente(null);
  };

  const getSexo = (sexo) => {
    return sexo === 'F' ? 'Femenino' : 'Masculino';
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
            <th>Sexo</th>
            <th>Dirección</th>
            <th>Telefono</th>
            <th>Email</th>
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
              <td>{paciente.direccion}</td>
              <td>{paciente.telefono}</td>
              <td>{paciente.email}</td>
              <td>{getSexo(paciente.sexo)}</td>
              <td>{paciente.direccion}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(paciente)} className="action-btn">Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(paciente.idPaciente)} className="action-btn">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>     
    </div>
  );
};

export default PatientList;
