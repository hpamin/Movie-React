import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Autoplay } from 'swiper'
import {Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/pagination";

import imdbpic from '../../img/imdb.png'

export default function ArtistsMoviePage() {

    const {Artist_id} = useParams()
    const [ArtistInfo , setArtistInfo] = useState([])
    const [ArtistMoviesData ,setArtistMoviesData ] = useState([])
    const [ArtistImage , setArtistImage] = useState([]) 
    const [scrollOverview , setScrollOverview] = useState(false)
    async function ArtistsInfoApi(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/person/${Artist_id}?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&append_to_response=videos,images`)
        setArtistInfo(data)
        console.log(data);
        setArtistImage(data.images.profiles)
        console.log(ArtistImage);
    }

    async function ArtistMoviesApi(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people=${Artist_id}&with_watch_monetization_types=flatrate`)
        console.log(data);
        setArtistMoviesData(data.results)
    }
    
    
    useEffect(()=>{
        ArtistsInfoApi()
        ArtistMoviesApi()
    },[Artist_id])

  return (
    <section className='ArtistMovies'>

        <div className='ArtistInfo'>
            <div className='ArtistImg'>
                <img src={`https://image.tmdb.org/t/p/w300${ArtistInfo.profile_path}`} />
            </div>

            <div className='ArtistBioMovies'>
                <h2> {ArtistInfo.name} </h2>
                <div>
                    <h3 className='ArtistBio'>Biography</h3>
                    {(ArtistInfo.biography || "").length > 620 && <h3 style={{color:"#fdc13b"}}> Scroll to see more  </h3> }
                    <div className='biography'>
                        <h3>{ArtistInfo.biography}</h3>
                    </div>
                </div>
            </div>
            
            <div className='ArtistAbout'>
                <h2 style={{textAlign:'center'}}>Personal Info</h2>
                <hr />
                <div className='ArtistInfoDetails'>
                    <div>
                       <h3>Birthday:</h3>
                        <h4> {ArtistInfo.birthday} </h4>
                    </div>
                    <div>
                        <h3>Place of birth:</h3>
                        <h4>{ArtistInfo.place_of_birth}</h4>
                    </div>
                    <div>
                        <h3>Known For:</h3>
                        <h4>{ArtistInfo.known_for_department}</h4> 
                    </div>
                    <div>
                        <h3>Imdb id:</h3>
                        <h4>{ArtistInfo.imdb_id}</h4>
                    </div>
                    <div>
                        <h3>Popularity:</h3>
                        <h4>{ArtistInfo.popularity}</h4> 
                    </div>
                </div>
            </div>

        </div>

            <div>
                <Swiper
                    modules = {[Autoplay]}
                    autoplay={{
                        delay: 4000,
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
                    className='MovieSwiper'>  

                    {ArtistMoviesData.map((item) => 
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
                                    </div>                               
                            </NavLink>
                        </SwiperSlide>
                        )
                    }
                    </Swiper>
            </div>


    </section>
  )
}
