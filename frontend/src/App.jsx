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


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element = {<HomePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies/:id' element ={<MovieDetails /> }/>
        <Route path='/seat-selection/:showtimeId' element={<SeatSelection />}/>


        <Route path='/user/register' element = {<UserRegister />} />
        <Route path='/user/login' element = {<UserLogin />} />
        
        <Route path='/admin/login' element = {<AdminLogin />} />
        <Route path='/admin/register' element = {<AdminRegister />} />

        <Route path='/addMovie' element = {<AddMovie />} />
        <Route path='/layout' element = {<Layout />}/>
        </Route>

      </Routes>
    </Router>
    </>
  );
}

export default App;