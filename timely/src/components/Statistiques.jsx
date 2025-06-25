import React, { useEffect, useState } from 'react';
import  supabase  from './supabaseClient';
import StatistiquesAdditionnelles from './StatistiquesAdditionnelle';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

function Statistiques(){
  const [userData, setUserData] = useState([]);
  const [runData, setRunData] = useState([]);
  const [period, setPeriod] = useState(7); // 👈 Valeur par défaut : 7 jours

  useEffect(() => {
    async function fetchData() {
      const { data: users } = await supabase.from('USERINFO').select('USERID, Name, TITLE, Gender');
      const { data: runs } = await supabase.from('USER_OF_RUN').select('USERID, STARTDATE');

      setUserData(users || []);
      setRunData(runs || []);
    }

    fetchData();
  }, []);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const getPastDates = (days) => {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(formatDate(d));
    }
    return dates;
  };

  const today = formatDate(new Date());
  const todayRunIDs = new Set(
    runData.filter((r) => formatDate(new Date(r.STARTDATE)) === today).map((r) => r.USERID)
  );
  const nbPresents = todayRunIDs.size;
  const nbAbsents = userData.length - nbPresents;

  const pieData = {
    labels: ['Présents', 'Absents'],
    datasets: [
      {
        data: [nbPresents, nbAbsents],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const lastNDays = getPastDates(period);
  const lineData = {
    labels: lastNDays,
    datasets: [
      {
        label: `Présents / jour (sur ${period} jours)`,
        data: lastNDays.map((date) =>
          runData.filter((r) => formatDate(new Date(r.STARTDATE)) === date).map((r) => r.USERID)
        ).map((ids) => new Set(ids).size),
        borderColor: '#4bc0c0',
        tension: 0.3,
      },
    ],
  };

  const presenceMap = new Map();
  runData.forEach((r) => {
    const uid = r.USERID;
    const day = formatDate(new Date(r.STARTDATE));
    if (!presenceMap.has(uid)) presenceMap.set(uid, new Set());
    presenceMap.get(uid).add(day);
  });

  const topAbsents = userData
    .map((u) => ({
      nom: u.Name,
      joursPresents: presenceMap.get(u.USERID)?.size || 0,
    }))
    .sort((a, b) => a.joursPresents - b.joursPresents)
    .slice(0, 5);

  const barDataAbsents = {
    labels: topAbsents.map((u) => u.nom),
    datasets: [
      {
        label: 'Jours de présence',
        data: topAbsents.map((u) => u.joursPresents),
        backgroundColor: '#f9a825',
      },
    ],
  };

  const presenceByTitle = {};
  userData.forEach((u) => {
    const title = u.TITLE || 'Inconnu';
    const isPresent = todayRunIDs.has(u.USERID);
    if (!presenceByTitle[title]) presenceByTitle[title] = { presents: 0, total: 0 };
    presenceByTitle[title].total++;
    if (isPresent) presenceByTitle[title].presents++;
  });

  const barTitleData = {
    labels: Object.keys(presenceByTitle),
    datasets: [
      {
        label: 'Présents',
        data: Object.values(presenceByTitle).map((v) => v.presents),
        backgroundColor: '#4caf50',
      },
      {
        label: 'Effectif total',
        data: Object.values(presenceByTitle).map((v) => v.total),
        backgroundColor: 'red',
      },
    ],
  };

  return (
    <div style={{ padding: '20px', textAlign:'center', width:'100%' }}>
      <h1 style={{fontFamily:'inter'}}>📊 Statistiques de Présence</h1>

        <div>
            <div style={{display: 'flex'}}>
                <div style={{ marginBottom: '40px' , margin:'15px',  width:'40%' , backgroundColor:' #efeeee', borderRadius:'30px', fontFamily:'inter'}}>
                    <h3>1. Répartition Présents / Absents aujourd’hui</h3>
                    <Pie data={pieData} />
                </div>
                <div style={{ marginBottom: '40px' , margin:'15px',  width:'60%' , backgroundColor:' #efeeee', borderRadius:'30px', fontFamily:'inter' }}>
                    <h3>2. Taux de présence sur plusieurs jours</h3>
                    <div style={{ marginBottom: '40px' }}>
                        <label>Choisir la période : </label>
                        <select value={period} onChange={(e) => setPeriod(Number(e.target.value))}>
                            <option value={7}>7 jours</option>
                            <option value={15}>15 jours</option>
                            <option value={30}>30 jours</option>
                        </select>
                    </div>
                    <Line data={lineData} />
                </div>
            </div>
        </div>

        <div  style={{display: 'flex'}}>
            <div style={{ marginBottom: '40px' , margin:'15px',  width:'40%'  , backgroundColor:' #efeeee', borderRadius:'30px', fontFamily:'inter'}}>
                <h3>3. Top 5 des absents</h3>
                <Bar data={barDataAbsents} options={{ indexAxis: 'y' }} />
            </div>

            <div style={{ marginBottom: '40px', margin:'15px', width:'60%' , backgroundColor:' #efeeee', borderRadius:'30px', fontFamily:'inter' }}>
                <h3>4. Présence par titre (aujourd’hui)</h3>
                <Bar data={barTitleData} />
            </div>
        </div>

          {/* anciens graphiques */}
          <StatistiquesAdditionnelles userData={userData} runData={runData} />
       
    </div>

    
  );

}

export default Statistiques