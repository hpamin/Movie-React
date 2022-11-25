import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Action() {
    const [Action , setAction] = useState([])
    async function ActionApi() {
        const {data} = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&page=2")
        setAction(data.results)
        console.log(data.results);
    }
    useEffect(()=>{
        ActionApi()
    } , [])
  return (
    <section>
        {Action.map((movie)=>
            <div>
                <img src= {`https://image.tmdb.org/t/p/w780${movie.poster_path}`} />
                <h3>{movie.title}</h3>
                <h4>{movie.vote_average}</h4>
            </div>
            )}
    </section>
  )
}
