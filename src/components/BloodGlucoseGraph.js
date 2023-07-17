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
        const rawData = await response.json();
        console.log(rawData);

        if (response.ok) {
          // Extract only the properties you care about from each item
          const data = rawData.map(item => ({
            displayTime: item.displayTime,
            value: item.value,
            trend: item.trend,
            trendRate: item.trendRate,
          }));

          setDexcomData(data);
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
      {
        label: 'Trend',
        data: dexcomData ? dexcomData.map(item => item.trend) : [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Trend Rate',
        data: dexcomData ? dexcomData.map(item => item.trendRate) : [],
        fill: false,
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255, 0.2)',
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
