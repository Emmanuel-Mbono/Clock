import Banner from './Banner'
import Board3 from './Board3'
import '../styles/Layout.css'
import Statistiques from './Statistiques'

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