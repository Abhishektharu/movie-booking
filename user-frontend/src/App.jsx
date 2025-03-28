import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MovieDetails from './pages/MovieDetails/MovieDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />

        <Route path='/movies/:id' element ={<MovieDetails /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
