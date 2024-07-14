import React from 'react';
import '../about/about.css';
import img1 from '../../utils/img/hero-bg.jpg';

const AboutScreen = () => {
  return (
    <div>
      <section id="hero" class="hero section light-background">
        <img src={img1} alt="Test" style={{ width: '100%', height: 'auto' }} />

        <div className="container">
          <div className="about-content">
            <h1>Acerca de Nosotros</h1>
            <p>Nuestra plataforma está dedicada a mejorar el acceso y la experiencia de atención médica para todos nuestros usuarios.</p>
            <p>Con tecnología de punta y un equipo de profesionales comprometidos, estamos aquí para asegurar que cada paciente reciba la mejor atención posible.</p>
            <p>Contamos con un Centro de la Mujer y la Familia, brindando servicios especializados garantizando una atención integral a la salud de la mujer en las distintas etapas de su vida,
               con la máxima calidad asistencial de nuestros profesionales.</p>
            
          </div>         
        </div>
      </section>
    </div>
  );
};

export default AboutScreen;
