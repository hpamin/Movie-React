import React, { useContext, useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import useWindowDimensions from '../windowSize'

import MenuBurgur from './MenuBurgur';

export default function NavHeader() {

    const {user , setUser , setSearch} = useContext(UserContext)
    const[scrollY , setScrollY] = useState(() => window.scrollY)
    const[ShowSettings , setShowSettings] = useState(false)

    const {width} = useWindowDimensions()

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            setScrollY(window.scrollY)
        })
    },[])
    
    function handleLogout(){
        localStorage.removeItem('session')
        setUser(null)
        setShowSettings(false)
    }
    function handleSettings(){
        if (ShowSettings === true) {
            setShowSettings(false)
        }else{
            setShowSettings(true)
        }
    }

    return (
    <nav className='navFix'> 
            <NavLink to='/' style={{width:"fit-content"}}>
                <h2>Night Movies</h2>
            </NavLink>
           {width > 800 ?  (
            <div className='listDetails'>
                <div className='list'>
                    <NavLink> <h4>  serries</h4> </NavLink>
                    <NavLink> <h4>  Movies  </h4> </NavLink>
                    <NavLink to='/person/popular'> <h4>  Artists  </h4> </NavLink>
                    <NavLink to='/genre/movie/list' > <h4>  Genres       </h4> </NavLink>
                    <button className='CustomBtn' onClick={()=>setSearch(true)} > <h4>  Search  </h4> </button>   
                    <NavLink> <h4>  About us     </h4> </NavLink>
                </div> 
                <div>
                {user ? ( <div className='LogIn-out'> 
                            <button className='CustomBtn' title='Settings user'  onClick={handleSettings}> {user.username} </button>
                            <button className='button' onClick={handleLogout}>Log out</button>
                        </div> ) 
                : ( <NavLink className='Login' to='/LogIn'>Log In</NavLink> )
                }
                </div>
            </div>
             ) : (
                <MenuBurgur />
             ) }
             
            <div style={{right: ShowSettings ? 90 : -250}} className = " SettingsUser" > 
                <NavLink style={{textAlign:'center'}}>
                    <h2 style={{color:'#fdcb13'}}> {user && user.username} </h2>
                    <h4>view profile</h4>
                </NavLink> 
                <div>
                    <NavLink> list </NavLink>    
                    <NavLink> Rating </NavLink>    
                    <NavLink> Watch List </NavLink>    
                </div>   
                <hr />
                <div>
                    <NavLink> Edit profile </NavLink>    
                    <NavLink> Settings </NavLink>    
                </div>
                <hr />
                <div>
                    <NavLink onClick={handleLogout}> Log out </NavLink>    
                </div>
            </div>
            
    </nav>
  )
}
