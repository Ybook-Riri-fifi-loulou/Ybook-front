import React from 'react';
import './styles/_custom.scss';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import ConfirmRegister from './components/ConfirmRegister';
import Home from './Layouts/Home';
import AddPost from './components/AddPosts';

const location = window.location.pathname;

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/confirmation' element={<ConfirmRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/addpost" element={<AddPost />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
