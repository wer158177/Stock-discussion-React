import React, { useState, useRef, useEffect } from 'react';
import './Chat.css'; // 스타일을 별도로 분리하여 추가합니다.

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(''); // 입력을 위한 상태 추가
  const chatBoxRef = useRef(null); // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동시키기 위한 ref

  const handleSend = () => {
    if (input.trim() !== '') {
      const newMessage = input;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, sender: 'user' }, // 사용자가 보낸 메시지
      ]);
      setInput(''); // 입력창 초기화

      // 예시로 상대방 메시지를 추가할 수도 있습니다 (시간 차이를 둘 수도 있음)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a message from another user', sender: 'other' },
        ]);
      }, 1000); // 1초 뒤에 상대방의 메시지를 추가
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // 엔터 키를 누르고, Shift키가 눌리지 않은 경우
      e.preventDefault(); // 새 줄 추가 방지
      handleSend(); // 메시지 전송
    }
  };

  // 메시지가 추가될 때마다 자동으로 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // 엔터 키 이벤트 핸들러 추가
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
