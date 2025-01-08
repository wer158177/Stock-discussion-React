import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import RealtimeChart from './RealtimeChart';
import HistoricalChart from '../StockChart/HistoricalChart';
import { TIME_RANGES } from './constants';
import './StockChart.css';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend,
  zoomPlugin
);

function StockChart({ selectedStock = 'KRW-BTC' }) {
  const [timeRange, setTimeRange] = useState('day');

  return (
    <div className="chart-container">
      <div className="time-range-buttons">
        {Object.entries(TIME_RANGES).map(([key, value]) => (
          <button 
            key={key}
            className={`time-range-button ${timeRange === value ? 'active' : ''}`}
            onClick={() => setTimeRange(value)}
          >
            {key === 'REALTIME' ? '분봉' :
             key === 'DAY' ? '일봉' :
             key === 'WEEK' ? '주봉' :
             key === 'MONTH' ? '월봉' : '연봉'}
          </button>
        ))}
      </div>
      {timeRange === 'realtime' ? (
        <RealtimeChart selectedStock={selectedStock} />
      ) : (
        <HistoricalChart selectedStock={selectedStock} timeRange={timeRange} />
      )}
    </div>
  );
}

export default StockChart;