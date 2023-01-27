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
import { GlobalProvider, useGlobal } from './providers/GlobalProvider';
import Friends from './Layouts/Friends';

const location = window.location.pathname;


function App() {
  const { userInfo } = useGlobal();

  return (
    <>
      <div className="App">
        <Header />
        {userInfo ?
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/friends' element={<Friends />} />
            </Routes>
          :
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path='/confirmation' element={<ConfirmRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </Routes>
        }
        <Footer />
      </div>
    </>
  );
}

export default App;
