import React, { useContext, useEffect, useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../Context/UserContext'
import imdbpic from '../../img/imdb.png'
import axios from 'axios';
import { toast } from 'react-toastify';


function AppReducer(state , action){
    console.log(action.payload);
    switch(action.type){
        case "prevent":
            if (state > 1) {
                console.log(state);
                return state - 1
            }else{
                toast.error("Can't be less than zero")
            }
        case "next":
            if (state < action.payload) {
                console.log(state);
                return state + 1
            }
        default:
             return state
    }
}

export default function SearchPage() {
    const {input } = useContext(UserContext)

    const [searchPageData , setSearchPageData ] = useState([])
    const [state , dispatch] = useReducer(AppReducer , 1 )
    const [loading , setLoading] = useState(true)
    const [totalPage ,setTotalPage ] = useState()


    async function SearchPageApi(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&query=${input}&page=${state}&include_adult=false`).finally(()=>setLoading(false))
        console.log(data);
        setTotalPage(data.total_pages)
        setSearchPageData(data.results)
    }


    useEffect(()=>{
        SearchPageApi()
    },[input , state])

  return (
    <section className='SearchPage'>
        <h3 className='MovieSearchFin'>Your Movie Search is : {input} </h3>
        <div className='SearchPageData'>
        {searchPageData.map((item)=>
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
        </div>

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
