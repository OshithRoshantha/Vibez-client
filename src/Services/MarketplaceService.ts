import axios from 'axios';

const API = import.meta.env.VITE_API;

export const getMarketplaceItems  = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/product/findAll/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getProductDetails = async (productId: string) => {
    const response = await axios.get(`https://${API}/product/find/${productId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getActiveListingCount = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/product/count/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const isUserSeller = async (userId: string) => {
    const response = await axios.get(`https://${API}/product/isSeller/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getMyListings = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/product/my/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const addClick = async (productId: string) => {
    const response = await axios.put(`https://${API}/product/addClick/${productId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;  
}

export const getTotalClicks = async () => {
    const sellerId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/product/totalClicks/${sellerId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data; 
}

export const searchProducts = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/product/search/${userId}/${keyword}`);
    return response.data;
}

export const isProductListed = async (productId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`https://${API}/product/isAdded/${productId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}