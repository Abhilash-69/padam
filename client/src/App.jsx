import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { LandingPage } from './LandingPage';
// import { Login } from './login';
import { Movie } from './Movie';
import { MovieCard } from './MovieCard';
import Login from './components/Login'
import Register from './components/Register'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';

const url = "http://localhost:3000/auth"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    checkAuthenticated()
  }, [])

  const checkAuthenticated = () => {
    axios.get(`${url}/is-verified`, {
      headers: {token: localStorage.getItem("token")}
    }).then((response) => {
      setIsAuthenticated(response.data)
    })
  }

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  return (
  // <BrowserRouter>
  //   <Routes>
  //     {/* <Route path='/' Component={LandingPage}/>
  //     {/* <Route path='/login' Component={Login}/> */}
  //     <Route path='/m/:movie_name' Component={Movie}/>
  //     <Route path="/card" Component={MovieCard}/> */}
  //   </Routes>
      <div className="App">
      <Router>
        <Routes>
          {/* <Route path='/' Component={LandingPage}/> */}
          <Route path='/' element={isAuthenticated ? <LandingPage setAuth={setAuth} />: <Navigate to="/login" replace />}/>
          <Route path='/login' element={!isAuthenticated? <Login setAuth={setAuth} />: <Navigate to="/" />}/>
          <Route path='/register' element={!isAuthenticated ? <Register setAuth={setAuth} />: <Navigate to="/"/>}/>
          <Route path='/m/:movie_name' Component={Movie}/>
          <Route path="/card" Component={MovieCard}/>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App
