import React from 'react';
import './style/_custom.scss';
import Register from './components/Register';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
