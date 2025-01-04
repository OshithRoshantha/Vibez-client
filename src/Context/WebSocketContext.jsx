import { createContext, useContext, useState, useEffect } from 'react';

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children, isLoggedIn }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const token = sessionStorage.getItem('token');
      const ws = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

      ws.onopen = () => {
        ws.send(JSON.stringify({ action: 'subscribe', topic: 'profileService' }));
        ws.send(JSON.stringify({ action: 'subscribe', topic: 'friendshipService' }));
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error: ", error);
      };

      ws.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      };

      setSocket(ws);

      return () => {
        if (ws) {
          ws.close();
        }
      };
    }
  }, [isLoggedIn]);

  return (
    <WebSocketContext.Provider value={{ socket, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};
