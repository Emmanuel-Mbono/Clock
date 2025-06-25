import horaire1 from '../assets/horaire1.png'
import '../styles/Authentification.css'
import {Link, useNavigate} from "react-router-dom"
import React from 'react'
import { useState } from 'react'
import supabase from '../components/supabaseClient'

function Authentification(){
    const navigate= useNavigate()
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [message, setMessage]= useState("")

    const handleSubmit= async(event)=>{
        event.preventDefault()
        setMessage("")

        const {data, error}= await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error){
            setMessage(error.message)
            setEmail("")
            setPassword("")
            return
        }
        if(data){
            navigate("/Accueil")
            
            
            return null
        }


    }
    
   return(
           <div className='login'>
               <p className='title1'>Login</p>
               <br></br>
               {message && <span>{message}</span>}
               <div className='formulaire'>
                   <div className='logo11'>
                       <div className='logo1'>
                           <img src={horaire1} alt='logo'/>
                           <p>TempoRH</p>
                        </div>
                    </div>
                       <div className='form1'>
                           <form onSubmit={handleSubmit} className='form'>
                               <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder="email" id="email" required/>
                               <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder="password" id='password' required />
                               <button type="submit">Se connecter</button>
                           </form>
                       </div>
               </div>
               <div className="compte">
                   <span>Vous n'avez pas de  compte? </span>
                   <Link to="/Register">Créer un comptre</Link>
               </div>
           </div>
    )
}

export default Authentification