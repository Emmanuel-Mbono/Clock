// Fichier : StatistiquesPresence.js (partie additionnelle)
// Ajoute 3 nouveaux graphiques : 
// - Comparaison par genre (H/F)
// - Fréquence de pointage par heure
// - Taux de présence hebdomadaire


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
import { Pie, Bar, Line } from 'react-chartjs-2';

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

function StatistiquesAdditionnelles({ userData, runData }) {
  const formatDate = (d) => d.toISOString().split('T')[0];

  // 📍 5. Présence par genre aujourd'hui
  const today = formatDate(new Date());
  const todayRunIDs = new Set(
    runData.filter(r => formatDate(new Date(r.STARTDATE)) === today).map(r => r.USERID)
  );

  const genreStats = { Homme: 0, Femme: 0 };
  userData.forEach(u => {
    const genre = u.Gender === 'F' ? 'Femme' : 'Homme';
    if (todayRunIDs.has(u.USERID)) genreStats[genre]++;
  });

  const genreData = {
    labels: ['Homme', 'Femme'],
    datasets: [{
      label: 'Présence par genre',
      data: [genreStats['Homme'], genreStats['Femme']],
      backgroundColor: ['#42a5f5', '#f06292']
    }]
  };

  // 📍 6. Fréquence de pointage par heure
  const hourCounts = new Array(24).fill(0);
  runData.forEach(r => {
    const d = new Date(r.STARTDATE);
    if (formatDate(d) === today) {
      hourCounts[d.getHours()]++;
    }
  });

  const hourData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
    datasets: [{
      label: 'Pointages par heure',
      data: hourCounts,
      backgroundColor: '#26c6da'
    }]
  };

  // 📍 7. Taux de présence hebdomadaire
  const now = new Date();
  const weeklyLabels = [];
  const weeklyData = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const label = d.toLocaleDateString('fr-FR', { weekday: 'short' });
    const dateStr = formatDate(d);
    weeklyLabels.push(label);

    const dailyIDs = new Set(
      runData.filter(r => formatDate(new Date(r.STARTDATE)) === dateStr).map(r => r.USERID)
    );
    weeklyData.push(dailyIDs.size);
  }

  const semaineData = {
    labels: weeklyLabels,
    datasets: [{
      label: 'Présents par jour',
      data: weeklyData,
      backgroundColor: '#7e57c2'
    }]
  };

  return (
    <div style={{ marginTop: '40px' , fontFamily:'inter', width:'100%'}}>
      <div style={{display:'flex', width:'100%'}}>
        <div style={{width:'40%', backgroundColor:' #efeeee', borderRadius:'30px', fontFamily:'inter', margin:'15px', boxShadow:' 5px 5px 10px rgba(0, 0, 0, 0.5)'}}>
          <h3>5. Présence par genre (aujourd'hui)</h3>
          <Pie data={genreData} />
        </div>
        <div style={{width:'60%', backgroundColor:' #efeeee', borderRadius:'30px', fontFamily:'inter', margin:'15px', boxShadow:' 5px 5px 10px rgba(0, 0, 0, 0.5)'}}>
          <h3 style={{ }}>6. Fréquence des pointages (aujourd'hui)</h3>
          <Bar data={hourData} />
        </div>
      </div>
      <h3 style={{ marginTop: '40px' }}>7. Taux de présence cette semaine</h3>
      <Line data={semaineData} />
    </div>
  );
}

export default StatistiquesAdditionnelles;
