import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {Swiper , SwiperSlide } from 'swiper/react'

import "swiper/css";
import "swiper/css/pagination";
import {Autoplay } from "swiper";


import imdbpic from '../../img/imdb.png'
import LoadingGif from '../../img/loading.gif'
export default function PopularMovie() {
    
    const [PopularMovie , setPopularMovie] = useState([])
    const [loadin , setLoading] = useState(true)
    async function ApiMovie(){
        const {data} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&page=1').finally(() => setLoading(false) )
        setPopularMovie(data.results)
  } 

  useEffect(()=>{
    setLoading(true)
    ApiMovie()
  },[])
  
  
return (
    <section>
        <div className='titleMovie'> <h2>Popular Movie</h2> </div>
        <Swiper
            modules = {[Autoplay]}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
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
            className='MovieSwiper'>

            {loadin && <div  className='loading'>  <img src={LoadingGif}/> </div> } 
            
        {PopularMovie.map((item) => 
            <SwiperSlide key={item.id}>
                <NavLink to={`/movie/${item.id}`}>
                        <div className="container MovieBox">
                                <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} alt={item.title} className='MoviePoster' />
                                
                                <div className='MovieInfo'>
                                    <div className='MovieTitle'>
                                        <h3 className='MovieName'> {item.title}</h3>
                                    </div>
                                    <div className='MovieImdb'> 
                                        <img src={imdbpic} style={{width : 40}}/> 
                                        <h4 style={{color : "white"}}>10 / {item.vote_average}</h4>
                                    </div>
                                </div>

                            <div className="overlay">
                                <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} className='CaptionBgPoster' />
                                <span className='BgPoster'></span>
                                
                                <div className="text"> 
                                        {item.overview.length > 250 ? <h4>{item.overview.substring(0 , 250)}...</h4> : <h4>{item.overview.substring(0 , 250)}</h4> }
                                </div>
                                
                            </div>
                        </div>                               
                </NavLink>
            </SwiperSlide>
            )
        }
        </Swiper>

    </section>

  )
}
