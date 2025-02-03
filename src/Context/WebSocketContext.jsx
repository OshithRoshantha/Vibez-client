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
      const ws = new WebSocket(`wss://${API}/vibez-websocket?token=${token}`);

      ws.onopen = () => {
        ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'profileService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'friendshipService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'marketplaceService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'messageService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'groupService' }));
        ws.send(JSON.stringify({ action: 'subscribe', userId, topic: 'accountDelete' }));
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error: ", error);
      };

      ws.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      };

      setSocket(ws);

      return () => ws.close();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (socket) {
      const timer = setTimeout(() => socket.close(), 20 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [socket]);

  const send = (action, body) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action, body }));
    } else {
      console.error("WebSocket not connected");
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