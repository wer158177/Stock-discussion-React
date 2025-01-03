// src/components/MainContent.js

import React, { useState } from 'react';
import StockChart from './StockChart/StockChart';
import Chat from './Chat/Chat';

function MainContent() {
  const [selectedStock, setSelectedStock] = useState('KOSPI');
  
  const stockCategories = [
    { id: 'KOSPI', name: 'KOSPI' },
    { id: 'KOSDAQ', name: 'KOSDAQ' },
    { id: 'SAMSUNG', name: '삼성전자' },
    { id: 'SK', name: 'SK하이닉스' },
    { id: 'LG', name: 'LG전자' }
  ];

  return (
    <main className="main-content">
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
      
      <section className="stock-chart">
        <StockChart selectedStock={selectedStock} />
      </section>
      
      <section className="chat">
        <Chat stockRoom={selectedStock} />
      </section>
    </main>
  );
}

export default MainContent;
