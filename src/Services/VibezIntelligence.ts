import axios from 'axios';

const API = '3.88.247.66:8080';
const API2 = '3.88.247.66:5000';

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