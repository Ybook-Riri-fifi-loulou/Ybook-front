import React from 'react';
import './styles/_custom.scss';
import Register from './components/Register';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import ConfirmRegister from './components/ConfirmRegister';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/confirmation' element={<ConfirmRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
