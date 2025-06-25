import Banner from './Banner'
import Board from './Board'
//import { supabase } from './supabaseClient'
import React from 'react'
import '../styles/Layout.css'
import Menu from './Menu'
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