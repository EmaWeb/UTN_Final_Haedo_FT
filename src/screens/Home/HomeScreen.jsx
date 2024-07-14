import React from 'react'
import img1 from '../../utils/img/hero-bg.jpg'
import './home.css'
const HomeScreen = () => {
  return (
    <div>
      <section id="hero" class="hero section light-background">
        <img src={img1} alt="Test" style={{ width: '100%', height: 'auto' }} />
        <div class="container position-relative">
          <div class="welcome position-relative" data-aos="fade-down" data-aos-delay="100">
            <h2>Bienvenido a Consulweb</h2>
            <p>Somos un equipo de expertos en Medicina Familiar.</p>
          </div>

          <div class="row-home">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="card"> 
                <div class="card-body">
                  <h5 class="card-title">Atención médica personalizada</h5>
                  <p class="card-text">La atención médica cura; y el seguimiento cuida, orienta y protege.</p>
                  <a href="/medicos" class="btn btn-primary">Conoce a nuestros médicos</a>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">La Prevensión es primero.</h5>
                  <p class="card-text">Cuidamos la Salud de la Mujer, haciendo hincapié en la Prevensión.</p>
                  <a href="/about" class="btn btn-primary">Conocé más</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default HomeScreen
