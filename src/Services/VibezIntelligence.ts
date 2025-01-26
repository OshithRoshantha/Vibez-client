import axios from 'axios';

const API = import.meta.env.VITE_API;
const API2 = import.meta.env.VITE_API2;

export const getSmartReply = async (chatHistory: string[]) => {
    const response = await axios.post(`http://${API2}/vibez/ai_reply`, {
        chatHistory: chatHistory
    });
    return response.data.reply;
}

export const getChatHistory = async (receiverId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/message/history/${userId}/${receiverId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}