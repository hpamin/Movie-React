import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function reducer(state , action){
    switch(action.type){
        case "prevent":
            if (state > 1) {
                return state - 1
            }
        case "next":
            if (state < action.payload) {
                return state + 1
            }
        default:
             return state
    }
}
export default function Artists() {

    const [people , setPeople] = useState([])
    const [totalPage , setTotalPage] = useState()
    const [state , dispatch] = useReducer(reducer , 1)

    console.log(state);
    async function peopleApi(){
        try{
        const {data} = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&page=${state}`)
        setPeople(data.results)
        setTotalPage(data.total_pages)
        console.log(data);
        }catch{
            toast.error('check your vpn connection !!')
        }
    }

    useEffect(()=>{
        peopleApi()
    },[state])

    return (
    <section className='Artists'>
        <div className='ArtistsBox'>
            {people.map((item)=>
                <NavLink to={`/person/popular/${item.id}`} >
                    <div className='peoplesBox'>
                        <img src={`https://image.tmdb.org/t/p/w780${item.profile_path}`}  className='MoviePoster' style={{width:"75%"}} />
                        <h3>{item.name}</h3>
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
