import React, { useState } from "react";
import { useWebSocket } from "./useWebSocket";
import ChartBase from "./ChartBase";

function RealtimeChart({ selectedStock }) {
  const [combinedData, setCombinedData] = useState([]); // 병합된 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태

  useWebSocket(true, selectedStock, setCombinedData, setLoading);

  return (
    <ChartBase
      candleData={combinedData} // 병합된 데이터 전달
      loading={loading}
      selectedStock={selectedStock}
      timeRange="realtime"
    />
  );
}

export default RealtimeChart;
