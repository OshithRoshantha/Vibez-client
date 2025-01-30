import { createContext, useContext, useState, useEffect } from 'react';

const WebSocketContext = createContext();
const API = import.meta.env.VITE_API;

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children, isLoggedIn }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      const ws = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

      ws.onopen = () => {
        ws.send(JSON.stringify({ action: 'subscribe', userId: userId, topic: 'profileService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId: userId, topic: 'friendshipService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId: userId, topic: 'marketplaceService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId: userId, topic: 'messageService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId: userId, topic: 'groupService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId: userId, topic: 'accountDelete' }));
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

  useEffect(() => {
    if (socket) {
      const timer = setTimeout(() => {
        socket.close(); 
      }, 20 * 60 * 1000); 

      return () => clearTimeout(timer);
    }
  }, [socket]);

  return (
    <WebSocketContext.Provider value={{ socket, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};
