// import React, { useEffect, useState } from 'react';
// import { obtenerMedicos } from '../../fetching/medico.fetching';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../screens/medicos/medicos.css';
// import img1 from '../../utils/img/medicos.jpg'

// const MedicosList = () => {
//   const [medicos, setMedicos] = useState([]);
//   const [errorText, setErrorText] = useState('');

//   useEffect(() => {
//     const getMedicos = async () => {
//       try {
//         const medicosData = await obtenerMedicos();      
//         setMedicos(Array.isArray(medicosData) ? medicosData : []);
//       } catch (error) {
//         setErrorText(error.message);
//       }
//     };
//     getMedicos();
//   }, []);

//   return (
//     <div>
//       <section id="hero" class="hero section light-background">
//         <img src={img1} alt="Test"/>
//         <div className="medicos-list-container">
//           <h1>Lista de Médicos</h1>
//           {errorText && <div className="error-text">{errorText}</div>}
//           <ul>
//             {medicos.map((medico) => (
//               <li key={medico.idMedico} className="medico-item">
//                 <div >
//                   <div className="medico-info">
//                     <span>Nombre del médico: </span>
//                     {medico.nombre} {medico.apellido}
//                   </div>
//                   <div className="medico-info">
//                     <span>Especialidad: </span>
//                     {medico.nom_E}
//                   </div>
//                   <div className="medico-info">
//                     <span>Hora inicio: </span>
//                     {medico.hora_inicio}
//                   </div>
//                   <div className="medico-info">
//                     <span>Hora final: </span>
//                     {medico.hora_final}
//                   </div>
//                   <div className="medico-info">
//                     <span>Dias de atención: </span>
//                     {medico.nom_D}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MedicosList;


import React, { useEffect, useState } from 'react';
import { obtenerMedicos } from '../../fetching/medico.fetching';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../screens/medicos/medicos.css';
import img1 from '../../utils/img/medicos.jpg'

const MedicosList = () => {
  const [medicos, setMedicos] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const getMedicos = async () => {
      try {
        const medicosData = await obtenerMedicos();      
        setMedicos(Array.isArray(medicosData) ? medicosData : []);
      } catch (error) {
        setErrorText(error.message);
      }
    };
    getMedicos();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const indexOfLastMedico = currentPage * itemsPerPage;
  const indexOfFirstMedico = indexOfLastMedico - itemsPerPage;
  const currentMedicos = medicos.slice(indexOfFirstMedico, indexOfLastMedico);

  const totalPages = Math.ceil(medicos.length / itemsPerPage);

  return (
    <div>
      <section id="hero" className="hero section light-background">
        <img src={img1} alt="Test" />
        <div className="medicos-list-container">
          <h1>Lista de Médicos</h1>
          {errorText && <div className="error-text">{errorText}</div>}
          <div className="row">
            {currentMedicos.map((medico) => (
              <div key={medico.idMedico} className="col-md-6 col-lg-3">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{medico.nombre} {medico.apellido}</h5>
                    <p className="card-text"><strong>Especialidad:</strong> {medico.nom_E}</p>
                    <p className="card-text"><strong>Hora inicio:</strong> {formatTime(medico.hora_inicio)}</p>
                    <p className="card-text"><strong>Hora final:</strong> {formatTime(medico.hora_final)}</p>
                    <p className="card-text"><strong>Días de atención:</strong> {medico.nom_D}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav>
            <ul className="pagination justify-content-center">
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default MedicosList;
