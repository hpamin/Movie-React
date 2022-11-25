import React, { useEffect, useState } from 'react'
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper";
import { useParams } from 'react-router-dom';
import axios from 'axios';


export function useStateMovie({data}) {
    console.log(data); 
}
export default function SeriesCast() {
    const {id} = useParams()
    const [Movie , setMovie] = useState([])
    
    const [Genre , setGenre] = useState([])
    const [SpokenLanguages , setSpokenLanguages] = useState([])
    const [ProductionCountries , setProductionCountries ] = useState([])
    const [Videos , setVideos] = useState([])
    
    async function PopularMovie(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&append_to_response=videos,images`)
        setMovie(data)
        setGenre(data.genres)
        setSpokenLanguages(data.spoken_languages)
        setProductionCountries(data.production_countries)
        setVideos(data.videos.results)
        console.log(data);
        useStateMovie(data)
    }

    useEffect(()=>{
        PopularMovie()
    },[id])

return (
    <div className='SeriesCast'>

        <div className='castMoviePage'>
            <h2>Cast :</h2>
                <Swiper>
                    {<SwiperSlide>
                        
                        </SwiperSlide>
                    }
                </Swiper>
                
            <h2 style={{margin: '30px 0' }}> Video :</h2>
                <Swiper 
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter : true,
                    }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    modules={[EffectCoverflow, Autoplay]}
                    className="mySwiper">
                    
                  {Videos.map((item)=>
                    <SwiperSlide>
                        <div>
                            <iframe width="420" height="315"
                            src={`https://www.youtube.com/embed/${item.key}`}>
                            </iframe>
                        </div>
                    </SwiperSlide>
                  )}
                </Swiper>
        </div>

        <div className='AboutMovie'>
                <h2>About Movie</h2>
                <hr />
            <div>
                <h3>Genre of this: </h3>
                    <div style={{display:'flex',flexWrap:'wrap' , gap:15}}>
                        {Genre.map((item)=>
                            <h4>{item.name} </h4>
                        )}
                    </div>
            </div>

            <div>
                <h3>Status:</h3>
                <h4>{Movie.status}</h4>
            </div>

            <div>
                <h3>Original Language:</h3>
                <h4>{Movie.original_language}</h4>
            </div>

            <div>
                <h3>Spoken Languages:</h3>
                <div style={{display:'flex' , gap:15}}>
                    {SpokenLanguages.map((item)=>
                        <h4>{item.english_name}</h4>
                        )
                    }
                </div>
            </div>

            <div>
                <h3>Production Countries: </h3>
                <div style={{display:'flex' , gap:15}}>
                    {ProductionCountries.map((item)=>
                        <h4>{item.name}</h4>
                        )}
                </div>
            </div>

            <div>
                <h3>Imdb id:</h3>
                <h4>{Movie.imdb_id}</h4>
            </div>

            </div>
    </div>

  )
}
