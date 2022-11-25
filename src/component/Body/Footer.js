import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

export default function Footer() {

    const {user} = useContext(UserContext)

  return (
    <section className='footer'>
        <div className='footerDetails'>
            <div className='infoFooter'>
                <h2>Night Movie</h2>

                {user ? <h3 className='LogInFooter' >Hi {user.username}</h3> : <NavLink to='/LogIn' className='LogInFooter'>Log in</NavLink> }

            </div>
            <div className='infoFooter' >
                <h2>About us</h2> 
                <NavLink> About Developers </NavLink>
                <NavLink> About The moviedb </NavLink>
                <NavLink> Contact us </NavLink>
            </div>

            <div className='infoFooter' >
                <h2> Community </h2>
                <NavLink> Guidelines </NavLink>
                <NavLink> Twitter </NavLink>
                <NavLink> Telegram </NavLink>
            </div>
            <div className='infoFooter' >
                <h2>LEGAL</h2>
                <NavLink>Terms of Use</NavLink>
                <NavLink>Our Api</NavLink>
            </div>
        </div>
        <div>
            <h2 style={{fontFamily:'monospace' , color:'white'}}>Developed with ❤
            For movie and cinema lovers</h2>
        </div>
    </section>
  )
}
