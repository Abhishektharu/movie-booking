import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './components/Home/HomePage'
import Profile from './components/Profile/Profile'
import MovieDetails from './components/MovieDetails/MovieDetails'

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