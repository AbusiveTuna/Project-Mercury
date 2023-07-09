import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale } from 'chart.js';

Chart.register(LinearScale);

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
  <div style={{ height: "400px", width: "100%" }}>
    <Line data={data} options={options} />
  </div>
);

export default BloodGlucoseGraph;
