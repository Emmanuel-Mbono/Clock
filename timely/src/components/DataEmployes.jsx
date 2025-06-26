import '../styles/Menu.css'

import supabase from './supabaseClient'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import React, {useState, useEffect} from 'react'


function DataEmployes(){
    const [pointages, setPointages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchPointages() {
        const { data, error } = await supabase
            .from('USERINFO')
            .select("USERID, Badgenumber, Name, Gender, TITLE");

        console.log('📄 Résultat data :', data);
        console.log('⚠️ Erreur :', error);

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
  const nom = p.Name?.toLowerCase() || '';
  const titre = p.TITLE?.toLowerCase() || '';
  const id = p.USERID?.toString() || '';
  const badgenumber = p.Badgenumber?.toLowerCase() || '';
  const gender = p.Gender?.toLowerCase() || '';
  const term = searchTerm.toLowerCase();

  return (
    nom.includes(term) ||
    titre.includes(term) ||
    id.includes(term) ||
    badgenumber.includes(term) ||
    gender.includes(term)
  );
});

// ✅ Fonction d’exportation
  const exportToExcel = () => {
    const exportData = filteredPointages.map((p) => ({
      UserID: p.USERID,
      Nom: p.Name || '',
      Titre: p.TITLE || '',
      Badgenumber: p.Badgenumber,
      Gender: p.Gender,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'USERINFO');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Employés.xlsx');
  };
  

    if (loading) return <p>Chargement des données...</p>;

    return(
        <div style={{width:'100%'}}>
            <div style={{marginLeft:'400px', marginTop:'20px'}}>
                <input
                    type="text"
                    placeholder="Rechercher par nom, titre ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', width: '300px' , borderRadius: '15px', textAlign:'center', fontFamily:'inter' }}
                />
                <button onClick={exportToExcel} style={{ marginLeft: '10px', padding: '6px 12px', cursor:'pointer', fontFamily:'inter' }}>
                    📥 Exporter en Excel
                </button>
            </div>
            <table className='table' style={{fontFamily:'inter',width:'100%', marginTop: '30px'}}>
                <thead className='t1'>
                    <tr className='champ-name'>
                        <th style={{paddingRight:'60px', paddingLeft:'60px'}}>User ID</th>
                        <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Numero de Badge</th>
                        <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Name</th>
                        <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Genre</th>
                        <th style={{paddingRight:'60px', paddingLeft:'60px'}}>Titre</th>
                    </tr>
                </thead >  

                <tbody className='data-table'>
                    {filteredPointages.map((p, index) => (
                        <tr key={index}>
                            <td>{p.USERID}</td>
                            <td>{p.Badgenumber}</td>
                            <td>{p.Name}</td>
                            <td>{p.Gender}</td>
                            <td>{p.TITLE}</td>
                        </tr>
                    ))}
                </tbody>
        </table>
        </div>
    )
}

export default DataEmployes