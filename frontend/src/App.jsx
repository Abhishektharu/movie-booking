import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import Profile from './pages/Profile/Profile'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import SeatSelection from './pages/SeatSelection/SeatSelection'
import AdminLogin from './pages/Login/AdminLogin'
import AdminRegister from './pages/Register/AdminRegister'
import UserRegister from './pages/Register/UserRegister'
import UserLogin from './pages/Login/UserLogin'
import AddMovie from './pages/AddMovie/AddMovie'
import Layout from './components/Layout/Layout'
import AdminDashboard from './Dashboard/AdminDashboard'
import AddTheater from './pages/Theater/AddTheater'
import AddShowtime from './pages/Show/AddShowtime'
import Users from './pages/Users/Users'
import ProtectedRoute from './components/ProtectedRoute';
import SendEmail from './components/SendEmail/SendEmail'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/register' element={<AdminRegister />} />
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/movies/:id' element={<MovieDetails />} />
            <Route path='/seat-selection/:showtimeId' element={<SeatSelection />} />
            <Route path='/user/login' element={<UserLogin />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/movies/add' element={<AddMovie />} />
            <Route path='/admin/add-theater' element={<AddTheater />} />
            <Route path='/admin/add-show' element={<AddShowtime />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/all-movies' element={<HomePage />} />

            <Route path="/admin/send-email" element={<SendEmail />} />
            
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;