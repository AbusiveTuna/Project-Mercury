import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import SmartAlert from '../utils/SmartAlert';

const BloodGlucoseGraph = ({ onUpdateLastData }) => {
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
          var smartAlert = SmartAlert(parsedData);
          console.log(smartAlert);
          setDexcomData(parsedData);

          if (onUpdateLastData) {
            const lastData = parsedData[parsedData.length - 1];
            onUpdateLastData(lastData.value, lastData.trend);
          }
        } else {
          console.error(rawData.message);
        }
      } catch (error) {
        console.error('Failed to fetch Dexcom data: ', error);
      }
    }

    getDexcomData();
  }, [userId, onUpdateLastData]);

  // Determine the start and end times for the graph
  let startTime, endTime;
  if (dexcomData && dexcomData.length > 0) {
    endTime = new Date(dexcomData[dexcomData.length - 1].displayTime);
    endTime.setMinutes(endTime.getMinutes() + 10);
    startTime = new Date(endTime.getTime());
    startTime.setHours(startTime.getHours() - 4);
  }

  // Filter the data to only include points within the time range
  const filteredData = dexcomData ? dexcomData.filter(item => {
    const displayTime = new Date(item.displayTime);
    return displayTime >= startTime && displayTime <= endTime;
  }) : [];

  // Format the x-axis labels
  const formatTimeLabel = (value) => {
    const date = new Date(value);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const data = {
    labels: filteredData.map(item => formatTimeLabel(item.displayTime)),
    datasets: [
      {
        label: 'Blood Glucose Level',
        data: filteredData.map(item => item.value),
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
        min: 0,
        max: 400,
        ticks: {
          stepSize: 100,
        },
      },
      x: {
        ticks: {
          callback: formatTimeLabel,
        },
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
