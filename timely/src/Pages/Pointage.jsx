import Banner from './Banner'
import Board1 from './Board1'
import '../styles/Layout.css'
import DataPointage from './DataPointage'
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