import axios from 'axios';

const API = import.meta.env.VITE_API;

export const getAllChats = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/allChats/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getFavaouriteChats = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/favoriteChats/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getChatPreivew = async (chatId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/directChat/preview/${userId}/${chatId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const checkIsRelated = async (chatId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/directChat/isRelated/${userId}/${chatId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}

export const getChatMessages = async (reciverId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/message/directChat/${userId}/${reciverId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const sendMessage = async (receiverId: string, messageToSend: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const senderId = sessionStorage.getItem('userId');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'messageService',
                body: {
                    senderId,
                    receiverId,
                    message: messageToSend,
                },
            };
        socket.send(JSON.stringify(message));
        resolve(); 
        };
    });   
}

export const markAsRead = async (receiverId: string) => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    
    const response = await axios.put(
        `http://${API}/vibez/message/markAsRead/${receiverId}/${userId}`, 
        {},  
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data; 
}

export const getUnreadCount = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/message/unReadCount/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;  
}

export const checkIsUnreadChat = async (chatId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/messages/checkUnread/${chatId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}

export const searchChats = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/directChat/find/${userId}/${keyword}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}
