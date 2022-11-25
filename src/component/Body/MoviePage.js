import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { poster } from '../Apiconfig/ApiConfig';

import LoadingImg from '../../img/loading.gif'

import { UserContext } from '../Context/UserContext'

import { AiOutlineUnorderedList , AiOutlineHeart , AiOutlineEye , AiOutlineStar, AiOutlinePlayCircle } from "react-icons/ai";

import imdbpic from '../../img/imdb.png'
import SeriesCast, { useStateMovie } from './SeriesCast';
import { toast } from 'react-toastify';

export default function MoviePage() {

    // const [state , dispatch] = useReducer(AppReducer , null , amin)

    const [Loading , setLoading] = useState(true)
    const {id} = useParams()
    
    const {user, session } = useContext(UserContext)

    const [WatchList, setWatchList] = useState(false)
    const [Movie, setMovie] = useState([])
    const [favorite, setFavorite] = useState(false)

    const [favoriteList ,setFavoriteList] = useState()

    async function MovieData(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&append_to_response=videos,images,credits`).finally(() => setLoading(false))
        setMovie(data)
        console.log(data);
    }
    
    async function favoriteListApi(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/account/${id}/favorite/movies?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&sort_by=created_at.asc&page=1`)
        setFavoriteList(data.results)
    }

    const amin = favoriteList?.find((o)=> o.id === Movie.id )
    const mmd = amin ? true : false

    console.log(mmd);
    
    async function handleFavorite(){

        if(user){
            if(favorite === true){
                setFavorite(false)
                toast.success(`Add to favorite ${Movie.title}`)
            }else if(favorite === false){
                setFavorite(true)
                toast.success(`Remove from favorite list ${Movie.title}`)
            }
        }else{
            toast.error("Please log in")
        }

        const favoriteData = await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=57309969f55d0b3d29084effa0d8081c&session_id=${session}`,{
                media_type : "movie",
                media_id : Movie.id,
                favorite : favorite
            })
    }

    async function handleWatchList(){
        if(user){
            if(WatchList === true){
                setWatchList(false)
                toast.success(`Add to WatchList ${Movie.title}`)
            }else if(WatchList === false){
                setWatchList(true)
                toast.success(`Remove from WatchList list ${Movie.title}`)
            }
        }else{
            toast.error("Please log in")
        }
        const data = await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=57309969f55d0b3d29084effa0d8081c&session_id=${session}`,{
            media_type : 'movie',
            media_id : Movie.id,
            watchlist : WatchList
        })
    }
    
    useEffect(()=>{
        MovieData()
        favoriteListApi()
        // amin()
        // handleFavorite()
        // handleWatchList()
    },[id])
    
    
  return (
    <section>

    {Loading &&
        <div className='LoadingMoviePage'> <img src={LoadingImg} className='LoadingMovie'/> </div>
    }  
    
    <div className='Movie' style={{backgroundImage: `linear-gradient(to bottom , rgba(0, 0, 0, 0.6) , rgba(0, 0, 0, 0.4) , rgba(0, 0, 0, 0.2)) , url(https://image.tmdb.org/t/p/original${Movie.backdrop_path})`}}>
        <img src={poster(Movie.poster_path)} className='MovieImg' />        
        <div className='MovieDetails'>
            <h1>{Movie.title}  ({parseInt(Movie.release_date)})</h1>

            <div className='MoviePageOption'>
                <div className='MoviePageImdb'>
                    <img src={imdbpic} style={{width:40}} />
                    <h3> 10 / {Movie.vote_average} </h3>
                </div>
                <div className='icons'>
                    <AiOutlineHeart className='iconMovie' onClick={handleFavorite}  />      
                    <AiOutlineEye className='iconMovie'  onClick={handleWatchList}  />        
                    <AiOutlineStar className='iconMovie' />   
                    <AiOutlinePlayCircle className='iconMovie' />   
                      
                </div>
            </div> 
            <h3 className='overview'>{Movie.overview}</h3>
        </div>
    </div>

        <SeriesCast />
    
    </section>
  
 )}
