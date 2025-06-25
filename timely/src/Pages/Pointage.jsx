import Banner from '../components/Banner'
import Board1 from '../components/Board1'
import '../styles/Layout.css'
import DataPointage from '../components/DataPointage'
function Pointage(){
    return(
        <div>
            <Banner />
            <div className='cool'>
                <Board1 />
                <DataPointage />
            </div>
            
        </div>
    )

}

export default Pointage