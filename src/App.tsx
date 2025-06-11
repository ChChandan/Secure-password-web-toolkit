import React from 'react';
import PasswordStrength from './Pages/PasswordStrenght';
import Navbar from './components/Navbar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import HaveIbeenPawned from './Pages/HaveIbeenPawned';

import PasswordGenerator from './Pages/PasswordGenerator';
function App() {

  return (


    <>
    <BrowserRouter>
         <Navbar/>
      <Routes>
        <Route path="/" element={<PasswordStrength />} />
        <Route path="/HaveIbeenPawned" element={<HaveIbeenPawned />} />
        <Route path="/PasswordGenerator" element={<PasswordGenerator />} />
      
      </Routes>
    </BrowserRouter>

   
    
    </>
   
   
  );
}

export default App;