import '../styles/Menu.css'
import absence from '../assets/absence.png'
import employes from '../assets/employes.png'
import presence from '../assets/presence.png'
import graphique from '../assets/graphique.png'
import { Link } from 'react-router'
import supabase from './supabaseClient'
import React, {useState, useEffect} from 'react'

function Menu(){

    const [pointages, setPointages] = useState([]);
    const [userCount, setUserCount] = useState(0)
    const [userPresent, setUserPresent]= useState(0)
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPointages() {
      const { data, error } = await supabase
        .from('USER_OF_RUN')
        .select(`
          USERID,
          STARTDATE,
          ENDDATE,
          USERINFO ( Name, TITLE )
        `)
        .limit(3) // Limiter à 3 enregistrements
        .order('STARTDATE', { ascending: false })
        

      if (error) {
        console.error('Erreur de récupération :', error.message);
      } else {
        setPointages(data);
       
      }
      setLoading(false);
    }

    fetchPointages();
  }, []);

  useEffect(() => {
    async function fetchUserCount() {
      const { count, error } = await supabase
        .from('USERINFO')
        .select('USERID', { count: 'exact', head: true });

      if (error) {
        console.error('Erreur lors du comptage des utilisateurs :', error.message);
      } else {
        setUserCount(count);
      }

      setLoading(false);
    }

    fetchUserCount();
  }, []);

   // 🔧 Format de date : jj-m-yy
  function formatDate(date) {
    const jj = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(1, '0');
    const yy = String(date.getFullYear()).slice(2);
    return `${jj}-${m}-${yy}`;
  }

  useEffect(() => {
    async function fetchCount() {
      const today = new Date();
      const formattedToday = formatDate(today); // ex: "18-6-25"

      const { data, error } = await supabase
        .from('USER_OF_RUN')
        .select('USERID, STARTDATE');

      if (error) {
        console.error('Erreur Supabase :', error.message);
        setLoading(false);
        return;
      }

      // 🔍 Filtrage côté React (si STARTDATE est une string comme "18-6-25")
      const filtered = data.filter((row) => {
        if (!row.STARTDATE) return false;

        const rowDate = formatDate(new Date(row.STARTDATE));
        return rowDate === formattedToday;
      });

      // 🧠 Extraire USERID uniques
      const uniqueUserIds = [...new Set(filtered.map((r) => r.USERID))];

      setUserPresent(uniqueUserIds.length);
      setLoading(false);
    }

    fetchCount();
  }, []);
  const absent= userCount- userPresent


  if (loading) return <p>Chargement des données...</p>;


    

    return(
        <div>
            <p className='salutation'>Bienvenu dans TempoRH, votre application de gestions d'heures</p>
            <div className='Menu'>
                
                <div  className='bule'>
                  <Link to="/Horaires" style={{textDecoration: 'none', color : 'black'}}>
                      <div className='bule1'>
                          <img src={employes} alt='logo-employes'/>
                          <p>Employés</p>
                      </div>
                      <p className='nombre'>{userCount}</p>
                  </Link>
                </div>
                <div  className='bule'>
                    <Link to="/Horaires" style={{textDecoration: 'none', color : 'black'}}>
                        <div className='bule1'>
                            <img src={presence} alt='logo-presence'/>
                            <p>Présences</p>
                        </div>
                        <p className='nombre'>{userPresent}</p>
                    </Link>
                </div>
                <div  className='bule'>
                    <Link to="/Horaires" style={{textDecoration: 'none', color : 'black'}}>
                        <div className='bule1'>
                            <img src={absence} alt='logo-absence'/>
                            <p>Absences</p>
                        </div>
                        <p className='nombre'>{absent}</p>
                    </Link>
                </div>
                <div  className='bule'>
                    <Link to="/Planification" style={{textDecoration: 'none', color : 'black'}}>
                        <div className='bule1'>
                            <img src={graphique} alt='logo-graphique'/>
                            <p>statistiques</p>
                        </div>
                    </Link>
                </div>

            </div>
            <p className='auday'>Aujourd'hui dans Les Laboratoires Biopharma </p>
            <div className='tableau'>
                <table className='table'>
                    <thead className='t1'>
                        <tr className='champ-name'>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Titre</th>
                            <th>Heure d'arrivée</th>
                            <th>Heure de départ</th>
                        </tr>
                    </thead>
                    <tbody className='data-table'>
                    {pointages.map((p, index) => (
                        <tr key={index}>
                            <td>{p.USERID}</td>
                            <td>{p.USERINFO?.Name || '—'}</td>
                            <td>{p.USERINFO?.TITLE || '—'}</td>
                            <td>{p.STARTDATE}</td>
                            <td>{p.ENDDATE}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Link to="/Pointage" className='plus'>Plus</Link>

        </div>
    )
}

export default Menu