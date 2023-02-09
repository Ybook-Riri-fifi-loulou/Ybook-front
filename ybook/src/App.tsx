import React from 'react';
import './styles/_custom.scss';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import ConfirmRegister from './components/ConfirmRegister';
import Home from './Layouts/Home';
import Friends from './Layouts/Friends';
import {useGlobal} from "./providers/GlobalProvider";
import Profil from "./Layouts/Profil";
import io from 'socket.io-client';
import ChatPage from './components/Chat';

const location = window.location.pathname;

const socket = io('http://localhost:3200')

function App() {
  const { userInfo } = useGlobal();

  return (
    <>
      <div className="App">
        {userInfo ?
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/friends' element={<Friends />} />
              <Route path='/profil' element={<Profil />} />
              <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
            </Routes>
            <Footer />
          </>
          :
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path='/confirmation' element={<ConfirmRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </Routes>
        }
      </div>
    </>
  );
}

export default App;
