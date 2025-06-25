
import React from 'react'
import Employés from './Employés'
import Planification from './Planification'
import Authentification from './Authentification'
import Accueil from './Accueil'
import Pointage from './Pointage'
import Register from './Register'
import Wrapper from './Wrapper'
import Horaires from './Horaires'
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
