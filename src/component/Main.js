import React, { useContext, useEffect, useState } from 'react'
import Header from './Main/Header'
import GenreMovies from './Main/GenreMovies'
import NowPlaying from './Main/NowPlaying'

import PopularMovie from './Main/PopularMovie'
import TopRatedMovie from './Main/TopRatedMovie'
import TvMovieSeries from './Main/TvMovieSeries'
import Search from './Body/NavComponent/Search'
import { UserContext } from './Context/UserContext'
import SearchPage from './Main/SearchPage'

export default function Main() {
 
  const {pageSearch} = useContext(UserContext)

  return (
    <section>

        <Header />
        <GenreMovies />
        <PopularMovie/>
        <TopRatedMovie />
        <NowPlaying />
        <TvMovieSeries />

    </section>
  )
}
