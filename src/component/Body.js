import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from './Body/LogIn'
import Main from './Main'
import MoviePage from './Body/MoviePage'
import NavHeader from './Body/NavHeader'

import { ToastContainer, toast } from 'react-toastify';
import Search from './Body/NavComponent/Search'
import SearchPage from './Main/SearchPage'
import Footer from './Body/Footer'
import Genres from './Body/NavComponent/Genres'
import Moviegenres from './Body/Moviegenres'
import Artists from './Body/NavComponent/Artists'
import ArtistsMoviePage from './Body/ArtistsMoviePage'
export default function Body() {
  return (
    <BrowserRouter>
            <Search />
            <NavHeader />
            
        <Routes>
            <Route path='/' element=<Main /> />
            <Route path='/movie/:id' element=<MoviePage /> />
            <Route path='/search' element=<SearchPage /> />
            <Route path='/LogIn' element=<LogIn /> />
            <Route path='/genre/movie/list' element=<Genres /> />
            <Route path='/genre/movie/list/:Genre_id' element=<Moviegenres/>  />
            <Route path='/person/popular' element=<Artists/> />
            <Route path='/person/popular/:Artist_id' element=<ArtistsMoviePage /> />
        </Routes>
        
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            <Footer />
    </BrowserRouter>
  )
}
