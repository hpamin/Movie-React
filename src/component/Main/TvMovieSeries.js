
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Swiper , SwiperSlide } from 'swiper/react'

import "swiper/css";
import {Autoplay } from "swiper";
import { poster } from '../Apiconfig/ApiConfig';
import { NavLink } from 'react-router-dom';

import imdbpic from '../../img/imdb.png'
export default function TvMovieSeries() {
  
   const[TvMovieSeries , setTvMovieSeries] = useState([])

   async function TvMovieSeriesApi (){
    const {data} = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&page=1')
    setTvMovieSeries(data.results)
    console.log(data.results);
    }
    
    const[move , SetMove] = useState(0)
    
     useEffect(()=>{
      TvMovieSeriesApi()
     },[])

    return (
    <section>
        <div className='titleMovie TvText'> <h2>TV Movie Series</h2> </div>
            <Swiper 
            modules = {[Autoplay]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter:true
            }}
            onAutoplayStart
            breakpoints ={ {
                300: {
                    slidesPerView: 3
                },
                 650: {
                    slidesPerView: 4
                },
                  800: {
                    slidesPerView: 5
                 }
            }}
            className = 'MovieSwiper' >
            
            {TvMovieSeries.map((movie)=>
                <SwiperSlide>
                    <NavLink to={`/movie/${movie.id}`}>
                        <div className='container MovieBox'>
                            <img src={poster(movie.poster_path)} className='MoviePoster' />
                            <div className='MovieInfo'>
                                <div className='MovieTitle'>
                                    <h3 className='MovieName'> {movie.title}</h3>
                                </div>
                            
                                <div className='MovieImdb'> 
                                    <img src={imdbpic} style={{width : 40}}/> 
                                    <h4 style={{color : "white"}}>10 / {movie.vote_average}</h4>
                                </div>
                            </div>

                            <div className="overlay PopularCaption">
                                <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} className='CaptionBgPoster' />
                                <span className='BgPoster'></span>
                                
                                <div className="text"> 
                                    {movie.overview.length > 250 ? <h4>{movie.overview.substring(0 , 250)}...</h4> : <h4>{movie.overview.substring(0 , 250)}</h4> }
                                </div>
                            </div>

                        </div>
                    </NavLink>
                </SwiperSlide>
                )}
                </Swiper>
    </section>
  )
}
