export const getChartOptions = (timeRange) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  responsiveAnimationDuration: 0,
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: getTimeUnit(timeRange),
        displayFormats: {
          minute: 'HH:mm',
          hour: 'HH:mm',
          day: 'MM/dd',
          week: 'yyyy/MM/dd',
          month: 'yyyy/MM',
          year: 'yyyy'
        },
        tooltipFormat: getTooltipFormat(timeRange)
      },
      ticks: {
        source: 'auto',
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 8,
        color: '#c4c3ca'
      },
      grid: {
        display: false
      }
    },
    y: {
      position: 'right',
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
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
      animation: false,
      position: 'nearest'
    },
    legend: {
      display: false
    },
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
        threshold: 10
      },
      zoom: {
        wheel: {
          enabled: true,
          modifierKey: 'ctrl'
        },
        pinch: {
          enabled: true
        },
        mode: 'x'
      }
    }
  }
});

// 시간 단위 설정 함수
const getTimeUnit = (timeRange) => {
  switch(timeRange) {
    case 'realtime': return 'minute';
    case 'day': return 'hour';
    case 'week': return 'day';
    case 'month': return 'week';
    case 'year': return 'month';
    default: return 'day';
  }
};

// 툴팁 포맷 설정 함수
const getTooltipFormat = (timeRange) => {
  switch(timeRange) {
    case 'realtime': return 'yyyy/MM/dd HH:mm';
    case 'day': return 'yyyy/MM/dd HH:mm';
    case 'week': return 'yyyy/MM/dd';
    case 'month': return 'yyyy/MM/dd';
    case 'year': return 'yyyy/MM';
    default: return 'yyyy/MM/dd';
  }
};

export { getTimeUnit, getTooltipFormat };