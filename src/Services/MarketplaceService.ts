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