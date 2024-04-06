import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './LandingPage';
// import { Login } from './login';
import { Movie } from './Movie';
import { MovieCard } from './MovieCard';

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' Component={LandingPage}/>
      {/* <Route path='/login' Component={Login}/> */}
      <Route path='/m/:movie_name' Component={Movie}/>
      <Route path="/card" Component={MovieCard}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
