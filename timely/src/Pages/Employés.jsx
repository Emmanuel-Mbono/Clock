
import Banner from '../components/Banner'
import Board2 from '../components/Board2'
import '../styles/Layout.css'
import DataEmployes from '../components/DataEmployes'

function Employés(){
    return(
        <div>
            <Banner />
            <div className='cool'>
                <Board2 />
                <DataEmployes />
            </div>
            
        </div>
    )
}

export default Employés