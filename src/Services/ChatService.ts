import axios from 'axios';

const API = import.meta.env.VITE_API;

export const getAllChats = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/allChats/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getFavaouriteChats = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/favoriteChats/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getChatPreivew = async (chatId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/directChat/preview/${userId}/${chatId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const checkIsRelated = async (chatId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/directChat/isRelated/${userId}/${chatId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}

export const getChatMessages = async (reciverId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/message/directChat/${userId}/${reciverId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const markAsRead = async (receiverId: string) => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    
    const response = await axios.put(
        `https://${API}/message/markAsRead/${receiverId}/${userId}`, 
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
    const response = await axios.get(`https://${API}/message/unReadCount/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;  
}

export const checkIsUnreadChat = async (chatId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/messages/checkUnread/${chatId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}

export const searchChats = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/directChat/find/${userId}/${keyword}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}
