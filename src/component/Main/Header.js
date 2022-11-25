import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay , Pagination } from "swiper";

import imdbpic from '../../img/imdb.png'

import posterjoker from '../../img/header/joker.jpg'
import videoJoker from '../../video/videoJoker.mp4'

const videoBg =[
    {video : videoJoker , id : '1' , poster : posterjoker , Name : "Joker" , date : "Release date: October 4, 2019" , cast : "Joaquin Phoenix · Arthur Fleck ; Robert De Niro · Murray Franklin ; Zazie Beetz · Sophie Dumond " , imdb : "8.4" },
    {video : videoJoker , id : '2' , poster : posterjoker , Name : "Joker" , date : "Release date: October 4, 2019" , cast : "Joaquin Phoenix · Arthur Fleck ; Robert De Niro · Murray Franklin ; Zazie Beetz · Sophie Dumond " , imdb : "8.4" },
    {video : videoJoker , id : '3' , poster : posterjoker , Name : "Joker" , date : "Release date: October 4, 2019" , cast : "Joaquin Phoenix · Arthur Fleck ; Robert De Niro · Murray Franklin ; Zazie Beetz · Sophie Dumond " , imdb : "8.4" },
]

export default function Header() {

    return (
    <section className='header'>

    <Swiper
    modules = {[Autoplay , Pagination]}
    centeredSlides = {true}
    pagination={{
        clickable: true,
      }}
    autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
    className = 'mySwiper' >
    {videoBg.map(({video , id , poster , Name , date , cast , imdb})=> 

        <SwiperSlide key={id}>
            <div className='divVideo'>
                <div>
                    <video className='videoBG' autoPlay loop muted>
                        <source src={video} type='video/mp4' />
                    </video>
                    <span className='Bgliner'></span>
                </div>

                <h3 className='dateMovie'>{date}</h3>
                
                <div className='cast'>
                    <h3>cast : </h3>
                    <h4>{cast}</h4>
                </div>

                <h2 className='MovieHeaderName'>{Name}</h2>
                
                <NavLink to='/joker' className='link'>
                
                        <img src={poster} className='poster' />
                        <button className='watch'>watch Now</button>
                        

                </NavLink>

                <div className='imdb'>
                    <img src={imdbpic} />
                    <h3>10 / {imdb}</h3>
                </div>
                
            </div>
        </SwiperSlide>    
        )
    }
    
    </Swiper>
    
    </section>
  )
}
