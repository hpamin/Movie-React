import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'


import imdbpic from '../../../img/imdb.png'
import delpic from '../../../img/x.png'

import { NavLink } from 'react-router-dom';
import 'animate.css';
import { toast } from 'react-toastify';

export default function Search() {
  const {search, setSearch,searchResults , setSearchResults , input , setInput} = useContext(UserContext)
  const [totalResults ,setTotalResults ] = useState()

  async function SearchData(){
    try{
      const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&query=${input}&page=1&include_adult=false`)
      setTotalResults(data.total_results)
      setSearchResults(data.results)
    }catch{
      toast.error('Search faild !!')
    }
  }
  

  function handleSearchInput(e){
    setInput(e.target.value)
    if(!search){
        e.target.value = " "  
    }
  }


  useEffect(()=>{

    const SearchMoviedb = setTimeout(() => {
      if(input) SearchData()
    }, 500);
    return () => clearTimeout(SearchMoviedb)
  },[input])

  return (
    <section>
          {search && 
          <div className='search animate__zoomIn' style={{zIndex : search ? 1 : 0}}>
            
            <div className='search-box'>
                <div className='search-input'>
                    <div className='inputAndNav'>
                      <input type='text' onChange={handleSearchInput} className='searchInput' autoFocus />
                      <NavLink to='/search' className='search-navlink' onClick={()=>setSearch(false)}>Search</NavLink>
                    </div>
                    <img src={delpic} onClick={()=>setSearch(false)} className='delSearch' />
                </div>
                <h4 className='number-find-movie'>Number of the Movie find : { input ? totalResults : 0}</h4>
                <div className='search-info'>

                  {input ? ( searchResults.map((item)=>

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
                                  {item.overview.length > 150 ? <h4>{item.overview.substring(0 , 250)}...</h4> : <h4>{item.overview.substring(0 , 250)}</h4> }
                            </div>
                        </div>

                    </NavLink>

                  )) : ( <div className='empty-search'>
                              <h2> Search a movie !! </h2>
                        </div>)
                  }
                </div>
            </div>
        </div>    
        }
    </section>
  )
}
