import axios from 'axios';



const instance = axios.create({
    baseURL: 'http://localhost:8084',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false // CORS 문제 해결을 위해 false로 설정
  });

  
const getDateRange = (interval) => {
  const now = new Date();
  const endDate = now.toISOString();
  let startDate = new Date();

  switch(interval) {
    case 'minutes':
      startDate.setHours(startDate.getHours() - 24);
      break;
    case 'daily':
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'weekly':
      startDate.setMonth(startDate.getMonth() - 3);
      break;
    case 'monthly':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    case 'yearly':
      startDate.setFullYear(startDate.getFullYear() - 5);
      break;
    default:
      startDate.setMonth(startDate.getMonth() - 1);
  }

  return {
    startDate: startDate.toISOString().split('.')[0],
    endDate: endDate.split('.')[0]
  };
};

export const fetchCandleData = async (interval = 'daily', market = 'KRW-BTC') => {
  try {
    const startDate = '2019-07-12T00:00:00';
    const endDate = '2025-01-05T23:59:59';
    
    const response = await instance.get(`/api/candles/${interval}`, {
      params: {
        market,
        startDate,
        endDate
      }
    });
    
    return response.data.map(candle => ({
      x: new Date(candle.candleDateTimeKst).getTime(),
      o: candle.openingPrice,
      h: candle.highPrice,
      l: candle.lowPrice,
      c: candle.tradePrice
    }));
  } catch (error) {
    console.error(`${market} 데이터 조회 실패:`, error);
    throw error;
  }
};