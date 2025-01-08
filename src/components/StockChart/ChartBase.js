import React, { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import { getChartOptions } from "./chartConfig";

function ChartBase({ candleData, loading, selectedStock, timeRange }) {
  const data = useMemo(() => ({
    datasets: [
      {
        label: selectedStock,
        data: candleData,
        borderColor: "#555",
        backgroundColor: candleData.map((d) =>
          d.c >= d.o ?  'rgba(54, 162, 235, 0.8)':'rgba(255, 99, 132, 0.8)'// 상승: 빨간색, 하락: 파란색
        ),
        borderWidth: candleData.map((d) => (d.isMinute ? 1 : 2)), // 초봉 두께 강조
      },
    ],
  }), [candleData, selectedStock]);

  const options = useMemo(() => getChartOptions(timeRange), [timeRange]);

  if (loading) return <div className="loading">로딩 중...</div>;

  return (
    <div className="stock-chart-container">
      <Chart type="candlestick" data={data} options={options} />
    </div>
  );
}

export default React.memo(ChartBase);
