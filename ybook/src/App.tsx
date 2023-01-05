import React from 'react';
import './styles/_custom.scss';
import Register from './components/Register';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';

const location = window.location.pathname;

function App() {
  if (location === '/register' || location === '/login') {
    return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    );
  } else {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
