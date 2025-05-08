import { createContext, useContext, useState, useEffect, useRef } from 'react';

const WebSocketContext = createContext();
const API = import.meta.env.VITE_API;

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children, isLoggedIn }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reconnectTrigger, setReconnectTrigger] = useState(0);
  const reconnectAttempts = useRef(0);
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const pendingMessages = useRef([]); 
  const isConnecting = useRef(false);

  const connectWebSocket = () => {
    if (!isLoggedIn) return;

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    isConnecting.current = true;
    
    const ws = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      isConnecting.current = false;
      reconnectAttempts.current = 0;
      
      ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'profileService' }));
      ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'friendshipService' }));
      ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'marketplaceService' }));
      ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'messageService' }));
      ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'groupService' }));
      ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'accountDelete' }));

      if (pendingMessages.current.length > 0) {
        pendingMessages.current.forEach(msg => {
          ws.send(JSON.stringify(msg));
        });
        pendingMessages.current = [];
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
      isConnecting.current = false;
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    };

    ws.onclose = (e) => {
      console.log('WebSocket closed:', e.code, e.reason);
      isConnecting.current = false;
      if (isLoggedIn) {
        const nextDelay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectAttempts.current += 1;
        console.log(`Reconnecting in ${nextDelay}ms...`);
        reconnectTimerRef.current = setTimeout(() => {
          setReconnectTrigger(prev => prev + 1);
        }, nextDelay);
      }
    };

    setSocket(ws);
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      pendingMessages.current = [];
      reconnectAttempts.current = 0;
    };
  }, [isLoggedIn, reconnectTrigger]);

  const send = (action, body) => {
    const message = { action, body };
    
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.log("Queuing message for later delivery:", message);
      pendingMessages.current.push(message);
      
      if (!isConnecting.current) {
        console.log("Triggering immediate reconnect...");
        setReconnectTrigger(prev => prev + 1);
      }
    }
  };

  const deleteUser = (email) => {
    const userId = sessionStorage.getItem('userId');
    send('accountDelete', { userId, email });
  };

  const updateUserMetaData = (userName, about, profilePicture) => {
    send('profileService', { 
      userId: sessionStorage.getItem('userId'),
      userName, 
      about, 
      profilePicture 
    });
  };

  const addListing = (productTitle, price, productDesc, productPhotos, location, visibleToFriends, condition) => {
    send('marketplaceService', {
      sellerId: sessionStorage.getItem('userId'),
      productAction: 'ADD',
      productTitle,
      price,
      productDesc,
      productPhotos,
      location,
      visibleToFriends,
      condition
    });
  };

  const updateListing = (productId, productTitle, price, productDesc, location, visibleToFriends, condition, productPhotos, totalClicks, listedDate) => {
    send('marketplaceService', {
      sellerId: sessionStorage.getItem('userId'),
      productAction: 'UPDATE',
      productId,
      productTitle,
      price,
      productDesc,
      location,
      visibleToFriends,
      condition,
      productPhotos,
      totalClicks,
      listedDate
    });
  };

  const deleteListing = (productId) => {
    send('marketplaceService', {
      productAction: 'REMOVE',
      productId
    });
  };

  const sendGroupMessage = (groupId, messageToSend) => {
    send('messageService', {
      senderId: sessionStorage.getItem('userId'),
      groupId,
      message: messageToSend
    });
  };

  const sendPrivateMessage = (receiverId, messageToSend) => {
    send('messageService', {
      senderId: sessionStorage.getItem('userId'),
      receiverId,
      message: messageToSend
    });
  };

  const createGroup = (groupName, groupIcon, groupDesc, memberIds) => {
    send('groupService', {
      creatorId: sessionStorage.getItem('userId'),
      groupName,
      groupIcon,
      groupDesc,
      memberIds
    });
  };

  const updateGroup = (groupId, groupName, groupIcon, groupDesc) => {
    send('groupService', {
      groupId,
      groupName,
      groupIcon,
      groupDesc
    });
  };

  const addMembers = (groupId, memberList) => {
    send('groupService', {
      groupAction: {
        groupId,
        action: 'addUsers',
        userIds: memberList
      }
    });
  };

  const removeMembers = (groupId, memberList) => {
    send('groupService', {
      groupAction: {
        groupId,
        action: 'removeUsers',
        userIds: memberList
      }
    });
  };

  const deleteGroup = (groupId) => {
    send('groupService', {
      groupAction: {
        groupId,
        action: 'deleteGroup'
      }
    });
  };

  const sendFriendRequest = (friendId) => {
    send('friendshipService', {
      userId: sessionStorage.getItem('userId'),
      friendId
    });
  };

  const acceptFriendRequest = (friendshipId) => {
    send('friendshipService', {
      friendshipId,
      status: 'ACCEPTED'
    });
  };

  const unFriend = (friendshipId) => {
    send('friendshipService', {
      friendshipId,
      status: 'UNFRIENDED'
    });
  };

  return (
    <WebSocketContext.Provider value={{
      socket,
      messages,
      deleteUser,
      updateUserMetaData,
      addListing,
      updateListing,
      deleteListing,
      sendGroupMessage,
      sendPrivateMessage,
      createGroup,
      updateGroup,
      addMembers,
      removeMembers,
      deleteGroup,
      sendFriendRequest,
      acceptFriendRequest,
      unFriend
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};