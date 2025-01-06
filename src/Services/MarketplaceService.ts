import axios from 'axios';

export const getMarketplaceItems  = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/product/findAll/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getItemInfo = async (productId: string) => {
    const response = await axios.get(`http://localhost:8080/vibez/product/find/${productId}}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};