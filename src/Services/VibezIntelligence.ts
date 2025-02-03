import axios from 'axios';

const API2 = import.meta.env.VITE_API2;

export const getSmartReply = async (receiverId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.post(`https://${API2}/ai_reply`, {
        userId,
        receiverId
    });
    return response.data;
}