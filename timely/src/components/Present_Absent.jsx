import React, { useEffect, useState } from 'react';
import  supabase from './supabaseClient';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Present_Absent(){



const [absents, setAbsents] = useState([]);
  const [presents, setPresents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 🔧 Obtenir date du jour en yyyy-mm-dd
  function formatISO(date) {
    return date.toISOString().split('T')[0]; // "2025-06-18"
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const startDate = new Date(selectedDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);

      // 1. Récupérer tous les utilisateurs
      const { data: users, error: userError } = await supabase
        .from('USERINFO')
        .select('USERID, Name, TITLE');

      if (userError) {
        console.error('Erreur Userinfo:', userError.message);
        setLoading(false);
        return;
      }

      // 2. Récupérer tous les USERID présents entre minuit et 23h59 ce jour-là
      const { data: runData, error: runError } = await supabase
        .from('USER_OF_RUN')
        .select('USERID')
        .gte('STARTDATE', startDate.toISOString())
        .lt('STARTDATE', endDate.toISOString());

      if (runError) {
        console.error('Erreur USER_OF_RUN:', runError.message);
        setLoading(false);
        return;
      }

      const presentIDs = new Set(runData.map((r) => r.USERID));
      const presents = users.filter((u) => presentIDs.has(u.USERID));
      const absents = users.filter((u) => !presentIDs.has(u.USERID));

      setPresents(presents);
      setAbsents(absents);
      setLoading(false);
    }

    fetchData();
  }, [selectedDate]);

  const exportToExcel = (list, label) => {
    if (!list || list.length === 0) return;

    const exportData = list.map((user) => ({
      UserID: user.USERID,
      Nom: user.Name,
      Titre: user.TITLE,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, label);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${label}_${formatISO(selectedDate)}.xlsx`);
  };

  return (
    <div style={{ padding: '20px', width:'100%', fontFamily:'inter', textAlign:'center' }}>
      <h2>Présence des utilisateurs</h2>

      <label>
        Choisir une date :{' '}
        <input
          type="date"
          value={formatISO(selectedDate)}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </label>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <h3>✔ Présents ({presents.length})</h3>
          <button onClick={() => exportToExcel(presents, 'Presents')}>📥 Export Présents</button>
          <table className='table' style={{fontFamily:'inter', marginTop: '30px', width:'100%'}}>
            <thead className='t1'>
              <tr className='champ-name'><th style={{paddingRight:'60px', paddingLeft:'60px'}}>UserID</th><th style={{paddingRight:'60px', paddingLeft:'60px'}}>Nom</th><th style={{paddingRight:'60px', paddingLeft:'60px'}}>Titre</th></tr>
            </thead>
            <tbody className='data-table'>
              {presents.map((u) => (
                <tr key={u.USERID}><td>{u.USERID}</td><td>{u.Name}</td><td>{u.TITLE}</td></tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <br></br>

          <h3>❌ Absents ({absents.length})</h3>
          <button onClick={() => exportToExcel(absents, 'Absents')}>📥 Export Absents</button>
          <table className='table' style={{fontFamily:'inter', marginTop: '30px', width:'100%'}}>
            <thead  className='t1'>
              <tr className='champ-name'><th style={{paddingRight:'60px', paddingLeft:'60px'}}>UserID</th><th style={{paddingRight:'60px', paddingLeft:'60px'}}>Nom</th><th style={{paddingRight:'60px', paddingLeft:'60px'}}>Titre</th></tr>
            </thead>
            <tbody className='data-table'>
              {absents.map((u) => (
                <tr key={u.USERID}><td>{u.USERID}</td><td>{u.Name}</td><td>{u.TITLE}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}




export default Present_Absent
