
import React from 'react'
import Employés from '../Pages/Employés'
import Planification from '../Pages/Planification'
import Authentification from '../Pages/Authentification'
import Accueil from '../Pages/Accueil'
import Pointage from '../Pages/Pointage'
import Register from '../Pages/Register'
import Wrapper from './Wrapper'
import Horaires from '../Pages/Horaires'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
    return(
        <BrowserRouter>
              <Routes>
                    <Route path="/" element={<Authentification />}/>
                    <Route path="/Accueil" element={
                        <Wrapper>
                            <Accueil />
                        </Wrapper>
                        }/>
                    <Route path="/Employés" element={<Employés />}/>
                    <Route path="/Planification" element={<Planification />}/>
                    <Route path="/Pointage" element={<Pointage />}/>
                    <Route path="/Register" element={<Register />}/>
                    <Route path="/Horaires" element={<Horaires/>}/>
               </Routes>
          </BrowserRouter> 

       ) 
    
}

export default App
