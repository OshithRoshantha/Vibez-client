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

export const getProductDetails = async (productId: string) => {
    const response = await axios.get(`http://localhost:8080/vibez/product/find/${productId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getActiveListingCount = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/product/count/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const isUserSeller = async (userId: string) => {
    const response = await axios.get(`http://localhost:8080/vibez/product/isSeller/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getMyListings = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/product/my/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const addClick = async (productId: string) => {
    const response = await axios.put(`http://localhost:8080/vibez/product/addClick/${productId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;  
}

export const getTotalClicks = async () => {
    const sellerId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/product/totalClicks/${sellerId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data; 
}

export const addListing = async (productTitle: string, price: string, productDesc: string, productPhotos: string[], location: string, visibleToFriends: boolean, condition: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const sellerId = sessionStorage.getItem('userId');
        const productAction = 'ADD';

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'marketplaceService',
                body: {
                    sellerId,
                    productTitle,
                    productDesc,
                    condition,
                    price,
                    location,
                    productPhotos,
                    visibleToFriends,
                    productAction
                },
            };
        socket.send(JSON.stringify(message));
        resolve(); 
        };
    });   
}

export const updateListing = async (productId: string, productTitle: string, price: string, productDesc: string, location: string, visibleToFriends: boolean, condition: string, productPhotos: string[]): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const sellerId = sessionStorage.getItem('userId');
        const productAction = 'UPDATE';

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'marketplaceService',
                body: {
                    sellerId,
                    productId,
                    productTitle,
                    productDesc,
                    condition,
                    price,
                    location,
                    visibleToFriends,
                    productPhotos,
                    productAction
                },
            };
        socket.send(JSON.stringify(message));
        resolve(); 
        };
    });   
}

export const deleteListing = async (productId: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const productAction = 'REMOVE';

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'marketplaceService',
                body: {
                    productId,
                    productAction
                },
            };
        socket.send(JSON.stringify(message));
        resolve(); 
        };
    });   
}

export const searchProducts = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/product/search/${userId}/${keyword}`);
    return response.data;
}

export const isProductListed = async (productId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/product/isAdded/${productId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}