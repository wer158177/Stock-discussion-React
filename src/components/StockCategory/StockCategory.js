import React from 'react';
import './StockCategory.css';

function StockCategory({ selectedStock, setSelectedStock }) {
  const stockCategories = [
    { id: 'KOSPI', name: 'KOSPI' },
    { id: 'KOSDAQ', name: 'KOSDAQ' },
    { id: 'SAMSUNG', name: '삼성전자' },
    { id: 'SK', name: 'SK하이닉스' },
    { id: 'LG', name: 'LG전자' }
  ];

  return (
    <div className="stock-categories">
      {stockCategories.map(stock => (
        <button
          key={stock.id}
          className={`category-button ${selectedStock === stock.id ? 'active' : ''}`}
          onClick={() => setSelectedStock(stock.id)}
        >
          {stock.name}
        </button>
      ))}
    </div>
  );
}

export default StockCategory;