import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

export default function Genres() {

    const [GenresData , setGenresData] = useState([])
    
    async function GenresApi(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US`)
        setGenresData(data.genres)
    }

    useEffect(()=>{
        GenresApi()
    },[])
    
  return (
    <section className='genres'>
        <div className='genresBoxs'>
            {GenresData.map((item)=>
                <div className='genresBox'>
                    <NavLink to={`/genre/movie/list/${item.id}`} className='genre' style={{backgroundImage:` linear-gradient(to bottom  ,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)) , url(https://picsum.photos/200/300?random=${Math.random()})`}}>
                        <h3> {item.name} </h3>
                    </NavLink>
                </div> 
                )
            }
        </div>
    </section>
  )
}
