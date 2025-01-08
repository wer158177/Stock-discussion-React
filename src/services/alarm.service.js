const ALARM_API = 'http://localhost:8000/activity-service/api/alarms';

export const alarmService = {
  subscribeToAlarms: (userId, onAlarmReceived) => {
    console.log(`알람 구독 시작 - userId: ${userId}`);
    
    const eventSource = new EventSource(`${ALARM_API}/stream`, {
      withCredentials: true
    });

    eventSource.onmessage = (event) => {
      console.log('알람 데이터 수신:', event.data);
      try {
        const alarm = JSON.parse(event.data);
        onAlarmReceived(alarm);
      } catch (error) {
        console.error('알람 데이터 파싱 에러:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결 에러:', error);
      eventSource.close();
    };

    eventSource.onopen = () => {
      console.log('SSE 연결 성공');
    };

    return eventSource;
  }
};