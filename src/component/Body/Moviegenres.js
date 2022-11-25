import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import imdbpic from '../../img/imdb.png'

import LoadingImg from '../../img/loading.gif'

function reducer(state , action){
    switch(action.type){
        case "prevent":
            if (state > 1) {
                return state - 1
            }else{
                toast.error("Can't be less than zero")
            }
        case "next":
            if (state < action.payload) {
                return state + 1
            }
        default:
             return state
    }
}
export default function Moviegenres() {

    const {Genre_id} = useParams()
    const [GenresData , setGenresData] = useState([])
    const [totalPage ,setTotalPage ] = useState()
    const [totalResults , setTotalResults] = useState()
    const [loading , setLoading] = useState(true)
    const [state , dispatch] = useReducer(reducer , 1 )
    
    
    async function GenresListApi(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${state}&with_genres=${Genre_id}&with_watch_monetization_types=flatrate`).finally(()=>setLoading(false))
        console.log(data);
        setGenresData(data.results)
        setTotalPage(data.total_pages)
        setTotalResults(data.total_results)
    }
    
    
    console.log(Genre_id);
    useEffect(()=>{
        GenresListApi()
    },[state])
    
    /******Loading...********/

    // const [GenresName , setGenresName] = useState({})

    // async function GenresApi(){
        //     const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US`)
        //     setGenresName(data.genres)
        //     console.log(data.genres);
        // }
    
    // const NameGenres = GenresName.find((item)=> item.id == Genre_id)
    
    // console.log(NameGenres.name);


  return (
    <section className='Moviegenres'>
        
            {loading &&
                <div className='LoadingMoviePage' style={{height:"100%"}}> <img src={LoadingImg} className='LoadingMovie'/> </div>
            }  

            <h2 style={{textAlign:'center', color:'white'}}>  Movies </h2>
            <h3 style={{textAlign:'center'}}> {totalResults} Movies find </h3>
            {GenresData.map((item)=>
                <NavLink to={`/movie/${item.id}`} className='search-result'>
                <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}/>
        
                  <div className='search-data'>
                      <div className='search-result-info'>
                          <h2 style={{color:'white'}}> {item.title} </h2>
                          <div className='vote-search'>
                            <img src={imdbpic} style={{width:60}} className='imdb-search' />
                            <h3> {item.vote_average} </h3>
                          </div>
                      </div>  
              
                      <div className='search-caption'>
                          <h4>{item.overview ? item.overview : <h4> *** No overview *** </h4> }</h4>
                      </div>
                  </div>
        
              </NavLink>
                )
            }
                <div className='pageOfSearch'>
                    <h2>start : 1</h2>
                    <h2>page : {state}</h2>
                    <h2>End : {totalPage}</h2>
                </div>
        
                <div style={{display:'flex' , justifyContent:"center" , gap:100}}> 
                    <h2 onClick={()=> dispatch({type : 'prevent'}) }> prevent </h2> 
                    <h2 onClick={()=> dispatch({type : 'next' , payload : totalPage })}> next </h2> 
                </div>
    
    </section>
  )
}
