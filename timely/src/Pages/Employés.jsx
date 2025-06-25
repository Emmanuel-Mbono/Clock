
import Banner from './Banner'
import Board2 from './Board2'
import '../styles/Layout.css'
import DataEmployes from './DataEmployes'

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