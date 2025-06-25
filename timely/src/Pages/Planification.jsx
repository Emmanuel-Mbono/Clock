import Banner from '../components/Banner'
import Board3 from '../components/Board3'
import '../styles/Layout.css'
import Statistiques from '../components/Statistiques'

function Planification(){
   return(
        <div>
            <Banner />
            <div className='cool'>
                <Board3 />
                <Statistiques />
            </div>
            
        </div>
    )
}

export default Planification