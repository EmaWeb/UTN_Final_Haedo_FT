import React, { useEffect } from 'react'
import { Route, Routes, Navigate  } from 'react-router-dom'
import LoginScreen from './screens/login/LoginScreen'
import RegisterScreen from './screens/register/RegisterScreen'
import HomeScreen from './screens/Home/HomeScreen'
import AboutScreen from './screens/about/AboutScreen'
import MedicosScreen from './screens/medicos/medicosScreen'
import PacienteScreen  from './screens/paciente/PacienteScreen'
import AdministrarScreen from './screens/admin/adminScrren'
import { useAuth } from './fetching/authContext';

const RouterApp = () => {
	const { authenticated } = useAuth(); 
	return (
		<Routes>
			<Route path='/' element={authenticated ? <Navigate to="/home" /> : <HomeScreen />} />			
			<Route path='/login' element={<LoginScreen />} />
			<Route path='/medicos' element={<MedicosScreen />} />
			<Route path='/about' element={<AboutScreen />} />			
			<Route path='/register' element={<RegisterScreen />} />		
			<Route path='/home' element={<HomeScreen />} />
			<Route path='/misdatos' element={<PacienteScreen />} />
			<Route path='/administrar' element={<AdministrarScreen />} />
			
		</Routes>
	)
}

export default RouterApp