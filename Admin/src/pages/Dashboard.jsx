import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { useState } from 'react';
import axios from 'axios';
import '../styles/header.css';

const Dashboard = () => {
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);

  useEffect(() => {
    const data1 = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'First 5 Month Order Rasio',
          data: [12, 19, 10, 5, 15],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    renderChart(chart1Ref, 'bar', data1);

    const data2 = {
      labels: ['June', 'July', 'August', 'September', 'October', 'November'],
      datasets: [
        {
          label: 'Last 5 Month Order Rasio',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    renderChart(chart2Ref, 'doughnut', data2);

    return () => {
      // Cleanup: destroy charts when the component is unmounted
      destroyChart(chart1Ref);
      destroyChart(chart2Ref);
    };
  }, []);

  const renderChart = (ref, type, data) => {
    const ctx = ref.current.getContext('2d');

    // Destroy existing chart if it exists
    destroyChart(ref);

    // Render new chart
    ref.current.chart = new Chart(ctx, {
      type: type,
      data: data,
    });
  };

  const destroyChart = (ref) => {
    if (ref.current && ref.current.chart) {
      ref.current.chart.destroy();
    }
  };

  return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'row' }}>
      <canvas ref={chart1Ref} className='graph col-12 col-md-6' style={{ height: '100%' }}></canvas>
      <canvas ref={chart2Ref} className='graph2 col-12 col-md-6' style={{ height: '100%' }}></canvas>
    </div>
  );
};

export default Dashboard;
