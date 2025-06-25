import '../styles/Board.css'
import pointage from '../assets/pointage.png'
import employes from '../assets/equipe.png'
import horaire from '../assets/horloge.png'
import planification from '../assets/planification-quotidienne.png'
import { Link } from 'react-router'


function Board(){
    return(
        <div className='dashbord'>
            <button className='board'>
                <Link to="/Accueil" className='link1'>Tableau de bord</Link>
            </button>
            <button className='but'>
                <img src={pointage} alt='logo-pointage' className='logo-employes'/>
                <Link to="/Pointage" className='link'>Pointages</Link>
            </button>
            <button className='but'>
                <img src={employes} alt='logo-employes' className='logo-employes'/>
                <Link to="/Employés" className='link'>Employés</Link>
            </button>
            <button className='but'>
                <img src={horaire} alt='logo-employes' className='logo-employes'/>
                <Link to="/Horaires" className='link'>Horaires</Link>
            </button>
            <button className='but'>
                <img src={planification} alt='logo-planification' className='logo-employes'/>
                <Link to="/Planification" className='link'>Planification</Link>
            </button>
        </div>
    )
}

export default Board