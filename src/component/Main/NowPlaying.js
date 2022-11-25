import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Swiper , SwiperSlide } from 'swiper/react'

import "swiper/css";
import "swiper/css/pagination";
import {Autoplay } from "swiper";


import imdbpic from '../../img/imdb.png'
import LoadingGif from '../../img/loading.gif'
import { NavLink } from 'react-router-dom';
export default function NowPlaying() {

    const [NowPlaying , setNowPlaying] = useState([])
    const [loadin , setLoading] = useState(true)

    async function NowPlayingApi(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&page=2`).finally(() => setLoading(false) )
        setNowPlaying(data.results)
        console.log(data.results);
      }
      
      useEffect(() => {
        NowPlayingApi()
    },[])

    const [BgSwiper , setBgSwiper] = useState("")

    function Bgimg(img){
      setBgSwiper(img)
      console.log(img);
    }


  return (
    <section className='NowPlaying'>
      <div className='titleMovie'> <h2>NowPlaying Movie</h2> </div>
          <Swiper 
          modules = {[Autoplay]}
          autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter : true
            }}
            breakpoints ={ {
              300:{
                slidesPerView: 3
              },
             650: {
                slidesPerView: 4
            },
              800: {
                slidesPerView: 5
             }
          }}
            onAutoplayStart
          className='NowPlayingSwiper' 
          style={{backgroundImage: BgSwiper=="" ? "url(https://image.tmdb.org/t/p/original/7zQJYV02yehWrQN6NjKsBorqUUS.jpg)" : `linear-gradient(to bottom , rgba(0, 0, 0, 0.6) , rgba(0, 0, 0, 0.4) , rgba(0, 0, 0, 0.2)) , url(${BgSwiper})` , padding: '150px 0px' }}>
         {loadin && <div  className='loading'>  <img src={LoadingGif}/> </div> } 
              {NowPlaying.map((Movie) =>
                    <SwiperSlide className='NowPlayingSwiperSlide' key={NowPlaying.id} >
                      <NavLink to={`/movie/${Movie.id}`}>
                        <div className='container MovieBox'  onMouseOver={() => Bgimg( `https://image.tmdb.org/t/p/original${Movie.backdrop_path}` ) } >
                          <img src={`https://image.tmdb.org/t/p/w500${Movie.poster_path}`} className='MoviePoster'/>
                          
                          <div className='MovieInfo'>
                              <div className='MovieTitle'>
                                  <h3 className='MovieName'> {Movie.title}</h3>
                              </div>

                              <div className='MovieImdb'> 
                                  <img src={imdbpic} style={{width : 40}}/> 
                                  <h4 style={{color : "white"}}>10 / {Movie.vote_average}</h4>
                              </div>
                          </div>
                            <div className="overlay">
                                  <img src={`https://image.tmdb.org/t/p/w780${Movie.poster_path}`} className='CaptionBgPoster' />
                                  <span className='BgPoster'></span>
                                  
                                  <div className="text"> 
                                          {Movie.overview.length > 250 ? <h4>{Movie.overview.substring(0 , 250)}...</h4> : <h4>{Movie.overview.substring(0 , 250)}</h4> }
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
