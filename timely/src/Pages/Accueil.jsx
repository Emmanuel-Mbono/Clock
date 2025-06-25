import Banner from '../components/Banner'
import Board from '../components/Board'
//import { supabase } from './supabaseClient'
import React from 'react'
import '../styles/Layout.css'
import Menu from '../components/Menu'
function Accueil(){
    return(
        <div>
            <Banner />
            <div className='cool'>
                <Board />
                <Menu />
            </div>
            
        </div>
    )
}
export default Accueil