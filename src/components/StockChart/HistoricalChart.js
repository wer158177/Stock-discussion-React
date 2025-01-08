import React, { useState, useRef, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { ko } from 'date-fns/locale';
import { fetchCandleData } from '../../services/candle.service';
import { INTERVALS } from './constants';
import { getChartOptions } from './chartConfig';

function HistoricalChart({ selectedStock, timeRange }) {
  const [candleData, setCandleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        const data = await fetchCandleData(
          INTERVALS[timeRange] || 'daily',
          selectedStock
        );
        setCandleData(data);
      } catch (error) {
        console.error('캔들 데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [timeRange, selectedStock]);

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  const data = {
    datasets: [{
      label: selectedStock,
      data: candleData,
      borderColor: '#4169e1',
      backgroundColor: candleData.map(d => 
        d.c >= d.o ?  'rgba(54, 162, 235, 0.8)':'rgba(255, 99, 132, 0.8)'
      ),
    }]
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="stock-chart-container">
      <button onClick={resetZoom}>초기 상태로 복원</button>
      <Chart 
        ref={chartRef}
        type="candlestick"
        data={data}
        options={getChartOptions(timeRange)}
      />
    </div>
  );
}

export default HistoricalChart;