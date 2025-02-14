import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import Profile from './pages/Profile/Profile'
import MovieDetails from './pages/MovieDetails/MovieDetails'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies/:id' element ={<MovieDetails /> }/>
      </Routes>
    </Router>
    </>
  );
}

export default App;