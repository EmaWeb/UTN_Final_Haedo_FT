import React from 'react'
import RouterApp from './RouterApp'
import Navigation from './components/navigation';
import { AuthProvider } from'./fetching/authContext';

function App() {
  return (
    <>
     <AuthProvider>
      <Navigation />   
      <RouterApp />
    </AuthProvider>
    </>   
  )
}

export default App




