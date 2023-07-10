import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Blood Glucose Level',
      data: [100, 110, 90, 120, 80, 130],
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

const BloodGlucoseGraph = () => (
  <>
    <Line data={data} options={options} />
  </>
);

export default BloodGlucoseGraph;
