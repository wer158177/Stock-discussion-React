// src/components/MainContent.js

import React, { useState } from 'react';
import StockChart from './StockChart/StockChart';
import StockCategory from './StockCategory/StockCategory';
import Chat from './Chat/Chat';
import './MainContent.css';

function MainContent() {
  const [selectedStock, setSelectedStock] = useState('KRW-BTC');

  return (
    <main className="main-content">
      <StockCategory 
        selectedStock={selectedStock} 
        setSelectedStock={setSelectedStock} 
      />
      
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
