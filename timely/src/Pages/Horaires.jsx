import Banner from '../components/Banner'
import Board4 from '../components/Board4'
import '../styles/Layout.css'
import Present_Absent from '../components/Present_Absent'
function Horaires(){
    return(
        <div>
            <Banner />
            <div className='cool'>
                <Board4 />
                <Present_Absent />
            </div>
            
        </div>
    )

}

export default Horaires