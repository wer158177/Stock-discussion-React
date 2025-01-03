import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import StockChart from '../components/StockChart/StockChart';
import Chat from '../components/Chat/Chat';
import Posts from '../components/Post/Posts';
import StockCategory from '../components/StockCategory/StockCategory';
import './MainPage.css';

function MainPage() {
  const [selectedStock, setSelectedStock] = useState('KOSPI');

  return (
    <div className="page-container">
      <Header />
      <StockCategory 
        selectedStock={selectedStock} 
        setSelectedStock={setSelectedStock} 
      />
      <div className="main-content">
        <section className="stock-chart">
          <StockChart selectedStock={selectedStock} />
        </section>
        <section className="chat">
          <Chat stockRoom={selectedStock} />
        </section>
        <section className="posts">
          <Posts />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;