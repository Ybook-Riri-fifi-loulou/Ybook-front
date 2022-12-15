import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';
import './styles/_custom.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
