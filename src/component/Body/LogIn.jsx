import React, { useContext, useState } from 'react'

import twitter from '../../icon/twitter.png'
import google from '../../icon/google.png'
import telegram from '../../icon/telegram.png'
import {NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

import LoadingImg from '../../img/loading.gif'
let icon = [
    { src : telegram },
    { src : google },
    { src : twitter },
]

export default function LogIn() {

    const {Login , Loading , setLoading , user} = useContext(UserContext)
    // session braye favrit v listo v hame ina estfade mishe(apie themoviedb khonde bshe)   


    const [input , setInput] = useState()
    
    /******login*****/
    const navigate = useNavigate()

    async function handleSubmit(e){
        const username = e.target.elements.username.value
        const password = e.target.elements.password.value
        e.preventDefault()
        setLoading(true)
        await Login(username , password)
        navigate
        ("/")
        setLoading(false)
    }
    
    
    return (
        <section className='login' >
        
            {Loading &&
                <div className='LoadingLogIn-error'> <img src={LoadingImg} className='LoadingMovie'/> </div>
            }  
        
        <div className='box'>
        
        <h2 className='welcometext'> Welcome to NightMovie </h2>
                <h3 className='Heytext'> Hey, Enter your details to get sign in to your account </h3>
                
                <form className='inputs' onSubmit={handleSubmit}>
                
                    <input 
                        type='text' 
                        name='username' 
                        className='input' 
                        value={input}
                        placeholder='Enter Email / Username' />
                    
                    <input 
                        type='password' 
                        name='password' 
                        className='input'
                        value={input}
                        placeholder='password' />

                    <input type="submit" className='button' />
                </form>

                <h4>-- or sign in with --</h4>

                <div className='icon'>
                
                    {
                        icon.map((item) => <a href='#' key={item.src}> <img  src={item.src} /> </a>)
                    }
                    
                 </div>

                <span> Don't have an account? <a href='https://www.themoviedb.org/signup' className='signupLink' > Sign Up </a> </span>
        </div>
    </section>
  )
}
