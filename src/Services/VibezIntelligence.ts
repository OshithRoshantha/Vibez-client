import axios from 'axios';

export const getSmartReply = async (chatHistory: string[]) => {
    const response = await axios.post('http://127.0.0.1:5000/vibez/ai_reply', {
        chatHistory: chatHistory
    });
    return response.data.reply;
}

export const getChatHistory = async (receiverId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/message/history/${userId}/${receiverId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}