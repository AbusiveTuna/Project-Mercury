import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { SmartAlert} from '../utils/SmartAlert';

const BloodGlucoseGraph = () => {
  const [dexcomData, setDexcomData] = useState(null);
  const userId = useSelector((state) => state.user_id);

  useEffect(() => {
    const getDexcomData = async () => {
      try {
        const response = await fetch(`https://protected-badlands-72029.herokuapp.com/getDexcomData/${userId}`);
        const rawData = await response.json();

        if (response.ok) {
          const parsedData = rawData.records.map(item => ({
            displayTime: item.displayTime,
            value: item.value,
            trend: item.trend,
            trendRate: item.trendRate
          }));
          console.log("Parsed Data: ", parsedData);
          var smartAlert = SmartAlert(parsedData);
          setDexcomData(parsedData);
        } else {
          console.error(rawData.message);
        }
      } catch (error) {
        console.error('Failed to fetch Dexcom data: ', error);
      }
    }

    getDexcomData();
  }, [userId]);

  const data = {
    labels: dexcomData ? dexcomData.map(item => new Date(item.displayTime)) : [],
    datasets: [
      {
        label: 'Blood Glucose Level',
        data: dexcomData ? dexcomData.map(item => item.value) : [],
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
