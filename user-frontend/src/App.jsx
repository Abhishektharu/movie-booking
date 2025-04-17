import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import SeatSelectionPage from './pages/SeatSelection/SeatSelection';
import UserDashboard from './Dashboard/UserDashboard';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      
      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
      <Route path="/" element={<Layout />}>
          <Route index element={<UserDashboard />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path='/seat-selection/:showtimeId' element={<SeatSelectionPage />} />
          
        </Route>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
