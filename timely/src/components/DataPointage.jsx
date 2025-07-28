import supabase from './supabaseClient'
import React, {useState, useEffect} from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'

function DataPointage(){
    const [pointages, setPointages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');


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

    const filteredPointages = pointages.filter((p) => {
  const nom = p.USERINFO?.Name?.toLowerCase() || '';
  const titre = p.USERINFO?.TITLE?.toLowerCase() || '';
  const id = p.USERID?.toString() || '';
  const startdate = p.STARTDATE?.toLowerCase() || '';
  const enddate = p.ENDDATE?.toLowerCase() || '';
  const term = searchTerm.toLowerCase();

  return (
    nom.includes(term) ||
    titre.includes(term) ||
    id.includes(term) ||
    startdate.includes(term) ||
    enddate.includes(term)
  );
});


 // ✅ Fonction d’exportation
  const exportToExcel = () => {
    try {
      const exportData = filteredPointages.map((p) => ({
        UserID: p.USERID,
        Nom: p.USERINFO?.Name || '',
        Titre: p.USERINFO?.TITLE || '',
        StartDate: p.STARTDATE,
        EndDate: p.ENDDATE,
        Statut: calcStatut(p.STARTDATE),
        Heure_sup: calcHeureSup(p.ENDDATE, p.STARTDATE)
      }));

      if (exportData.length === 0) {
        alert("Aucune donnée à exporter !");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'USER_OF_RUN');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'pointage.xlsx');

    } catch (error) {
      console.error("Erreur lors de l'exportation :", error);
      alert("Erreur lors de l'exportation !");
    }
  };


  const calcStatut = (startdate) => {
  const actual = new Date(startdate);
  const heure = actual.getHours();
  const minute = actual.getMinutes();

  if (heure > 8 || (heure === 8 && minute > 0)) {
    return 'En Retard ❌';
  } else {
    return 'A l\'heure ✅';
  }
};

  const calcHeureSup = (enddate, startdate ) => {
    const actual = new Date(enddate);
    const start = new Date(startdate);
    const heure = actual.getHours();
    const minute = actual.getMinutes();
    const heure1= start.getHours();
    const minute1= start.getHours()

    const heureActuellefin = heure + (minute / 60);
    const heureActuelledebut= heure1 + (minute1 /60)
    const heureNormaleTravail = 16.5 -8;

    const diff = (heureActuellefin - heureActuelledebut) - heureNormaleTravail;

    return diff.toFixed(2); // exemple : +0.25h ou -0.50h
  };




  if (loading) return <p>Chargement des données...</p>;


    return(
        
        <div style={{width:'100%'}}>
            <div style={{marginLeft:'400px', marginTop:'20px'}}> 
              <input
                  type="text"
                  placeholder="Rechercher par nom, titre, ID ou date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginBottom: '10px', padding: '5px', width: '300px' , borderRadius: '15px', textAlign:'center', fontFamily:'inter'}}
              />
              <button onClick={exportToExcel} style={{ marginLeft: '10px', padding: '6px 12px', cursor:'pointer', fontFamily:'inter' }}>
          📥    Exporter en Excel
              </button>
            </div>

            <table className='table' style={{fontFamily:'inter', width:'100%', marginTop: '30px'}}>
                    <thead className='t1'>
                        <tr className='champ-name'>
                            <th style={{paddingRight:'60px', paddingLeft:'60px'}}>ID</th>
                            <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Nom</th>
                            <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Titre</th>
                            <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Heure d'arrivée</th>
                            <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Heure de départ</th>
                            <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Statut</th>
                            <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Heure sup</th>
                        </tr>
                    </thead>
                    <tbody className='data-table'>
                    {filteredPointages.map((p, index) => (
                        <tr key={index}>
                            <td>{p.USERID}</td>
                            <td>{p.USERINFO?.Name || '—'}</td>
                            <td>{p.USERINFO?.TITLE || '—'}</td>
                            <td>{p.STARTDATE}</td>
                            <td>{p.ENDDATE}</td>
                            <td style={{ color: calcStatut(p.STARTDATE) === 'Retard' ? 'red' : 'green' }}>{calcStatut(p.STARTDATE)}</td>
                            <td style={{ color: (calcHeureSup(p.ENDDATE, p.STARTDATE) < 0)? 'red' : 'green' }}>{calcHeureSup(p.ENDDATE, p.STARTDATE)} h</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    )
}

export default DataPointage