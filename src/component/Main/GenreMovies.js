import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Swiper , SwiperSlide } from 'swiper/react'

import "swiper/css";
import "swiper/css/effect-cards";
import {Autoplay , EffectCards } from "swiper";

export default function GenreMovies() {

  const [ActionMovie , setActionMovie] = useState([])

  async function ActionMovieApi(){
    const {data} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&page=1')
    setActionMovie(data.results)  
  }

  ///////////////Adventure//////////////////

  const [AdventureMovie , setAdventureMovie] = useState([])

  async function AdventureMovieApi(){
    const {data} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&page=3')
    setAdventureMovie(data.results)  
  }

  useEffect(()=>{
    ActionMovieApi()
    AdventureMovieApi()
  },[])

  return (
    <section className='GenreMovies' style={{backgroundColor:'#fdc13b'}}>
    <div className='ActionGenre'>
      <div className='Action'>
      <div>
          <h2 className='Scroll'>>></h2>
      </div>
        <div className='GenreInfo'>
          <h2>Action</h2>
          <div>
            <h3>Click to see thousands of action text videos</h3>
            <button className='button moreAction'> Click to see more </button>
          </div>  
        </div>
      <Swiper 
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards , Autoplay]}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      className="mySwiper ActionSwiper">

          {ActionMovie.map((movie)=>
            <SwiperSlide>
                <div className='ActionMovie'> <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} /> </div>
            </SwiperSlide>  
            ) }
      
          </Swiper>
      </div>
    </div>

      <div className='AdventureGenre' > 
  
            <div className='GenreInfo'>
              <h2>Adventure</h2>
              <div className='ClickAdventure'>
                <h3>Click to see thousands of Adventure videos</h3>
                <button className='button moreAction'> Click to see more </button>
              </div>  
            </div>
          <Swiper 
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards , Autoplay]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,}}
          className="mySwiper ActionSwiper">

              {AdventureMovie.map((movie)=>
                <SwiperSlide>
                    <div className='AdventureMovie'> <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} /> </div>
                </SwiperSlide>  
                ) }
          
          </Swiper>
      </div>

    </section>
  )
}
