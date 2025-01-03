import React, { useState, useEffect } from 'react';
import './StockChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'react-chartjs-2';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';
import { ko } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  annotationPlugin,
  zoomPlugin
);

function StockChart({ selectedStock }) {
  console.log('현재 선택된 종목:', selectedStock);
  const [timeRange, setTimeRange] = useState('day');

  const getTimeInterval = (range) => {
    switch(range) {
      case 'realtime':
        return { unit: 'hour', count: 24 };
      case 'day':
        return { unit: 'day', count: 30 };
      case 'week':
        return { unit: 'week', count: 52 };
      case 'month':
        return { unit: 'month', count: 12 };
      case 'year':
        return { unit: 'month', count: 60 };
      default:
        return { unit: 'day', count: 30 };
    }
  };

  const generateDummyData = (count) => {
    const data = [];
    let lastClose = 100; // 시작 가격
    const now = new Date();
    const interval = getTimeInterval(timeRange);
  
    for (let i = 0; i < count; i++) {
      const date = new Date(now);
      switch(interval.unit) {
        case 'hour':
          date.setHours(date.getHours() - (count - 1 - i));
          break;
        case 'day':
          date.setDate(date.getDate() - (count - 1 - i));
          break;
        case 'week':
          date.setDate(date.getDate() - ((count - 1 - i) * 7));
          break;
        case 'month':
          date.setMonth(date.getMonth() - (count - 1 - i));
          break;
      }
  
      const volatility = 2; // 변동성
      const change = (Math.random() - 0.5) * volatility; // 무작위 변화
      const close = lastClose * (1 + change / 100);
      const open = lastClose; // 시가는 이전 종가와 동일
      const high = Math.max(open, close) + Math.random(); // 고가는 시가와 종가 중 큰 값 + 변동
      const low = Math.min(open, close) - Math.random(); // 저가는 시가와 종가 중 작은 값 - 변동
  
      data.push({
        x: date.getTime(),
        o: parseFloat(open.toFixed(2)),
        h: parseFloat(high.toFixed(2)),
        l: parseFloat(low.toFixed(2)),
        c: parseFloat(close.toFixed(2)),
      });
  
      lastClose = close; // 현재 종가를 다음 데이터의 기준으로 사용
    }
  
    return data;
  };
  
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: getTimeInterval(timeRange).unit,
          displayFormats: {
            hour: 'HH:mm',
            day: 'MM/dd',
            week: 'MM/dd',
            month: 'yyyy/MM',
          },
        },
        adapters: {
          date: {
            locale: ko
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#c4c3ca'
        }
      },
      y: {
        position: 'right',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#c4c3ca'
        }
      }
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: null,  // 수정키 없이도 패닝 가능
        },
        zoom: {
          wheel: {
            enabled: false,  // 휠 줌 비활성화
          },
          pinch: {
            enabled: false   // 핀치 줌 비활성화
          },
          drag: {
            enabled: false   // 드래그 줌 비활성화
          }
        }
      }
    }
  };

  const getData = (timeRange) => {
    // 선택된 종목에 따라 다른 데이터 반환
    switch(selectedStock) {
      case 'KOSPI':
        return generateDummyData(30);
      case 'SAMSUNG':
        return generateDummyData(20);
      default:
        return generateDummyData(10);
    }
  };

  const data = {
    datasets: [{
      label: 'KOSPI',
      data: getData(timeRange),
      color: {
        up: '#ef5350',  // 빨간색 (상승)
        down: '#26a69a',    // 초록색 (하락)
        unchanged: '#888888' // 회색 (변동없음)
      }
    }]
  };

  return (
    <div>
      <div className="time-range-buttons">
        <button 
          className={`time-range-button ${timeRange === 'realtime' ? 'active' : ''}`}
          onClick={() => setTimeRange('realtime')}
        >
          분
        </button>
        <button 
          className={`time-range-button ${timeRange === 'day' ? 'active' : ''}`}
          onClick={() => setTimeRange('day')}
        >
          일간
        </button>
        <button 
          className={`time-range-button ${timeRange === 'week' ? 'active' : ''}`}
          onClick={() => setTimeRange('week')}
        >
          주간
        </button>
        <button 
          className={`time-range-button ${timeRange === 'month' ? 'active' : ''}`}
          onClick={() => setTimeRange('month')}
        >
          월간
        </button>
        <button 
          className={`time-range-button ${timeRange === 'year' ? 'active' : ''}`}
          onClick={() => setTimeRange('year')}
        >
          연간
        </button>
      </div>
      <div className="stock-chart-container">
        <Chart type="candlestick" data={data} options={options} />
      </div>
    </div>
  );
};

export default StockChart;