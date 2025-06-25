import horaire1 from '../assets/horaire1.png'
import '../styles/Banner.css'
import supabase from './supabaseClient'
import React from 'react'
import { useNavigate } from 'react-router'


function Banner(){
    const navigate= useNavigate()
    const singOut= async() =>{
        const {error}= await supabase.auth.signOut()
        if(error) throw error
        navigate("/")
    }

    return(
        <div className='Banner'>
            <img src={horaire1} alt='horaire1' className='logo'/>
            <p className='title'>TempoRH</p>
            <button onClick={singOut} className='signout'>Sign out</button>
        </div>
    )
}

export default Banner