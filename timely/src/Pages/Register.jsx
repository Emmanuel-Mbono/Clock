import React, {useState} from "react"
import horaire1 from '../assets/horaire1.png'
import supabase from '../components/supabaseClient'
import { Link } from "react-router"
function Register(){
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [message, setMessage]= useState("")

    const handleSubmit= async(event)=>{
        event.preventDefault()
        setMessage("")

        const {data, error}= await supabase.auth.signUp({
            email: email,
            password: password
        })
        if(error){
            setMessage(error.message)
            return
        }
        if(data){
            setMessage("Votre compte a été créé avec succes")
        }

        setEmail("")
        setPassword("")
    }
    

    return(
        <div className='login'>
            <p className='title1'>Register</p>
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
                            <button type="submit">Creer un compte</button>
                        </form>
                    </div>
            </div>
            <div className="compte">
                <span>Vous avez deja un compte? </span>
                <Link to="/">Connectez vous</Link>
            </div>
        </div>
    )
}

export default Register