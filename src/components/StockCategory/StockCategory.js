import React, { useState } from 'react';
import './StockCategory.css';
import CreatePostModal from '../CreatePostModal/CreatePostModal';

function StockCategory({ selectedStock, setSelectedStock }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const stockCategories = [
    { market: 'KRW-BTC', name: '비트코인' },
    { market: 'KRW-ETH', name: '이더리움' },
    { market: 'KRW-XRP', name: '리플' },
    { market: 'KRW-SOL', name: '솔라나' },
    { market: 'KRW-DOGE', name: '도지코인' },
    { market: 'KRW-ADA', name: '에이다' },
    { market: 'KRW-MATIC', name: '폴리곤' },
    { market: 'KRW-DOT', name: '폴카닷' },
    { market: 'KRW-TRX', name: '트론' }
  ];

  const handleSubmit = (postData) => {
    console.log('New post:', postData);
    // 여기에 게시글 생성 로직 추가
  };

  return (
    <div className="stock-categories">
      <div className="categories-wrap">
        {stockCategories.map(stock => (
          <button
            key={stock.market}
            className={`category-button ${selectedStock === stock.market ? 'active' : ''}`}
            onClick={() => setSelectedStock(stock.market)}
          >
            {stock.name}
          </button>
        ))}
      </div>
      <button 
        className="write-button"
        onClick={() => setIsModalOpen(true)}
      >
        글쓰기
      </button>
      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default StockCategory;