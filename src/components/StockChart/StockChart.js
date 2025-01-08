import React, { useState, useEffect, useRef } from 'react';
import { fetchCandleData } from '../../services/candle.service';
import './StockChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
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
  zoomPlugin,
  Tooltip,
  Legend
);

function StockChart({ selectedStock = 'KRW-BTC' }) {
  const [timeRange, setTimeRange] = useState('day');
  const [candleData, setCandleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({ min: null, max: null });
  const chartRef = useRef(null);

  const getCandleData = async (interval, stock) => {
    try {
      setLoading(true);
      const data = await fetchCandleData(interval, stock);
      setCandleData(data);

      // 데이터의 범위를 설정
      if (data.length > 0) {
        const min = new Date(data[0].t).getTime();
        const max = new Date(data[data.length - 1].t).getTime();
        setRange({ min, max });
      }
    } catch (error) {
      console.error('캔들 데이터 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    switch(timeRange) {
      case 'realtime':
        interval = 'minutes';
        break;
      case 'day':
        interval = 'daily';
        break;
      case 'week':
        interval = 'weekly';
        break;
      case 'month':
        interval = 'monthly';
        break;
      case 'year':
        interval = 'yearly';
        break;
      default:
        interval = 'daily';
    }
    getCandleData(interval, selectedStock);
  }, [timeRange, selectedStock]);

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

  const resetZoom = () => {
    const chart = chartRef.current;
    if (chart) {
      chart.resetZoom();
    }
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
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            const { o, h, l, c } = context.raw;
            return `Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`;
          }
        }
      },
      legend: {
        display: false
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          onPan: ({ chart }) => {
            const xScale = chart.scales.x;
            const min = range.min;
            const max = range.max;
            
            // 범위를 벗어난 경우 강제로 범위 내로 이동
            if (xScale.min < min || xScale.max > max) {
              console.log('범위를 벗어났습니다. 초기 상태로 복원합니다.');
              resetZoom();
            }
          },
          rangeMin: {
            x: range.min,
          },
          rangeMax: {
            x: range.max,
          }
        },
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl', // Ctrl 키를 눌러야만 줌 가능
          },
          pinch: {
            enabled: true,
          },
          drag: {
            enabled: true,
            modifierKey: 'ctrl', // Ctrl 키를 눌러야만 줌 가능
          },
          mode: 'x',
          onZoom: ({ chart }) => {
            const xScale = chart.scales.x;
            const min = range.min;
            const max = range.max;

            // 범위를 벗어난 경우 강제로 범위 내로 이동
            if (xScale.min < min || xScale.max > max) {
              console.log('범위를 벗어났습니다. 초기 상태로 복원합니다.');
              resetZoom();
            }
          },
          rangeMin: {
            x: range.min,
          },
          rangeMax: {
            x: range.max,
          }
        }
      }
    }
  };

  const data = {
    datasets: [{
      label: selectedStock,
      data: candleData,
      color: {
        up: '#ef5350',
        down: '#26a69a',
        unchanged: '#888888'
      }
    }]
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

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
      <button onClick={resetZoom}>초기 상태로 복원</button>
      <div className="stock-chart-container">
        <Chart ref={chartRef} type="candlestick" data={data} options={options} />
      </div>
    </div>
  );
}

export default StockChart;