import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'
function App() {
  const movieNumber = 1;
  return (
  //     <>
  //   {/* here we can now render our MovieCard component , while rendering we have to pass some props in it */ }
  // { movieNumber === 1 ? <MovieCard movie={{ title: "Nida's Film", release_date: "24th July" }} /> : <MovieCard movie={{ title: "Nida's Film", release_date: "24th July" }} /> }
    
  //     </>
  <MovieProvider>
<NavBar />
   <main className='main-content'>
    <Routes>
   <Route path='/' element={<Home />} />
    <Route path='/favorites' element={<Favorites />} />
   </Routes>
  </main>
    </MovieProvider>
  );
}

export default App;