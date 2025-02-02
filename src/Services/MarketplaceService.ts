import axios from 'axios';

const API = import.meta.env.VITE_API;

export const getMarketplaceItems  = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/product/findAll/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getProductDetails = async (productId: string) => {
    const response = await axios.get(`http://${API}/vibez/product/find/${productId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getActiveListingCount = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/product/count/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const isUserSeller = async (userId: string) => {
    const response = await axios.get(`http://${API}/vibez/product/isSeller/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getMyListings = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/product/my/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const addClick = async (productId: string) => {
    const response = await axios.put(`http://${API}/vibez/product/addClick/${productId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;  
}

export const getTotalClicks = async () => {
    const sellerId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/product/totalClicks/${sellerId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data; 
}

export const searchProducts = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/product/search/${userId}/${keyword}`);
    return response.data;
}

export const isProductListed = async (productId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/product/isAdded/${productId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}