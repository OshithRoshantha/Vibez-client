import axios from 'axios';

export const getReceiptInfo = async (directChatId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/directChat/getReceipt/${userId}/${directChatId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}