import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext()

export default function UserProvider({children}) {
    
    /****Global****/
    const [Loading , setLoading] = useState()
    const [user , setUser] = useState(null)
    const [session , setSession] = useState(() => localStorage.getItem('session'))

    /****MoviePAge***/
    const [favoriteList ,setFavoriteList ] = useState()
    
    /*****Search*****/
    const [search , setSearch] = useState(false)
    const [searchResults , setSearchResults] = useState([])
    const [input , setInput] = useState()


    async function getUserData(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/account?api_key=57309969f55d0b3d29084effa0d8081c&session_id=${session}`)
        console.log(data);
        setUser(data)
    }

    async function getFavorite(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=57309969f55d0b3d29084effa0d8081c&language=en-US&sort_by=created_at.asc&session_id=${session}`)
        setFavoriteList(data.results);
    }

    useEffect(()=>{
        if(session){
            getUserData()
            getFavorite()
        }
    },[session])

    async function Login(username , password){
        try {
        const token = await axios.get("https://api.themoviedb.org/3/authentication/token/new?api_key=57309969f55d0b3d29084effa0d8081c")
        const authorize = await axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=57309969f55d0b3d29084effa0d8081c', {
            username,
            password,
            request_token : token.data.request_token
        })
        const session = await axios.post("https://api.themoviedb.org/3/authentication/session/new?api_key=57309969f55d0b3d29084effa0d8081c" , {
            request_token : token.data.request_token
        })
        console.log(session.data.session_id);
        setSession(session.data.session_id)
        localStorage.setItem('session' , session.data.session_id)
    } catch{
            toast.error("Invalid Username or password !")
            setLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{user, Login, session, setUser, Loading, setLoading, setSearch, search, searchResults, setSearchResults, input, setInput }}>
            {children}
        </UserContext.Provider>
  )
}
