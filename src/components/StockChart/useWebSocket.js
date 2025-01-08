import { useEffect, useRef } from "react";
import { throttle } from "lodash";

export const useWebSocket = (isRealtime, selectedStock, setCombinedData, setLoading) => {
  const minuteDataRef = useRef([]); // 분봉 데이터
  const tickerDataRef = useRef(null); // 초봉 데이터

  useEffect(() => {
    if (!isRealtime) return;

    let minuteWs = null;
    let tickerWs = null;

    // **분봉 WebSocket 연결**
    const connectMinuteWs = () => {
      minuteWs = new WebSocket("ws://localhost:8000/stock-service/ws/minute");

      minuteWs.onopen = () => {
        console.log("분봉 WebSocket 연결됨");
        minuteWs.send(
          JSON.stringify({
            type: "subscribe",
            market: selectedStock,
            interval: "minutes",
          })
        );
      };

      minuteWs.onmessage = (event) => {
        const data = JSON.parse(event.data);
      

        if (Array.isArray(data)) {
          // 최신 분봉 데이터 저장
          const formattedData = data.map((candle) => ({
            x: new Date(candle.candle_date_time_kst).getTime(),
            o: candle.opening_price,
            h: candle.high_price,
            l: candle.low_price,
            c: candle.trade_price,
            isMinute: true,
          }));
          minuteDataRef.current = formattedData; // 최신 분봉 데이터 저장
          updateCombinedData(); // 병합 데이터 업데이트
        }
        setLoading(false);
      };
    };

    // **초봉 WebSocket 연결**
    const connectTickerWs = () => {
      tickerWs = new WebSocket("ws://localhost:8000/stock-service/ws/ticker");

      tickerWs.onopen = () => {
        console.log("초봉 WebSocket 연결됨");
        tickerWs.send(
          JSON.stringify({
            type: "subscribe",
            market: selectedStock,
          })
        );
      };
      tickerWs.onmessage = throttle((event) => {
        const data = JSON.parse(event.data);
  
      
        // 최신 분봉 데이터 참조 (리스트의 첫 번째 데이터)
        const latestMinuteCandle = minuteDataRef.current[0]; // 최신 분봉 (리스트 첫 번째 항목)
      
        if (!latestMinuteCandle) {
          console.error("분봉 데이터가 없습니다.");
          return;
        }
      
        // **초봉의 고가와 저가 계산**
        const high = Math.max(data.trade_price, latestMinuteCandle.h); // 최신 분봉의 고가와 실시간 체결가 중 높은 값
        const low = Math.min(data.trade_price, latestMinuteCandle.l); // 최신 분봉의 저가와 실시간 체결가 중 낮은 값
      
        // **초봉 데이터 생성**
        tickerDataRef.current = {
          x: latestMinuteCandle.x + 60000, // 최신 분봉 시간 + 1분
          o: latestMinuteCandle.o, // 최신 분봉의 시가
          h: high, // 계산된 고가
          l: low, // 계산된 저가
          c: data.trade_price, // 초봉의 종가
          isMinute: false, // 초봉 데이터임을 표시
        };
      
        
      
        // 병합된 데이터 생성
        updateCombinedData();
      }, 1000);
      
      
    };

    // 병합된 데이터 생성
    const updateCombinedData = () => {
      const combinedData = [
        ...minuteDataRef.current,
        ...(tickerDataRef.current ? [tickerDataRef.current] : []),
      ];
      setCombinedData(combinedData); // 병합된 데이터로 상태 업데이트
    
    };
    
    connectMinuteWs();
    connectTickerWs();

    return () => {
      if (minuteWs) minuteWs.close();
      if (tickerWs) tickerWs.close();
    };
  }, [isRealtime, selectedStock]);
};
