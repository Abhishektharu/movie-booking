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
import HomePage from '../src/pages/Homepage';
import AllMovies from './components/AllMovies';
import Checkout from './pages/Checkout/Checkout';
import BookingConfirmation from './pages/BookingConfirmation/BookingConfirmation';

function App() {
  return (
    
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/home" element={<HomePage />} />
      
      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
      <Route path="/" element={<Layout />}>
          <Route index element={<UserDashboard />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path='/seat-selection/:showtimeId' element={<SeatSelectionPage />} />
          



            <Route path='/user/all-movies' element={<AllMovies />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            
        </Route>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
