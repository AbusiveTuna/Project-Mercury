import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const BloodGlucoseGraph = () => {
  const [dexcomData, setDexcomData] = useState(null);
  const userId = useSelector((state) => state.user_id);

  useEffect(() => {
    const getDexcomData = async () => {
      try {
        const response = await fetch(`https://protected-badlands-72029.herokuapp.com/getDexcomData/${userId}`);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setDexcomData(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch Dexcom data: ', error);
      }
    }

    getDexcomData();
  }, [userId]);

  const data = {
    labels: dexcomData ? dexcomData.map(item => item.date) : [],
    datasets: [
      {
        label: 'Blood Glucose Level',
        data: dexcomData ? dexcomData.map(item => item.glucoseLevel) : [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  


  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default BloodGlucoseGraph;
