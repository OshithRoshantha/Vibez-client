import axios from 'axios';

const API = '3.88.247.66:8080';

export const searchPeople = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/search/${userId}/${keyword}`);
    return response.data;
}

export const sendFriendRequest = async (friendId: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'friendshipService',
                body: {
                    userId,
                    friendId
                },
            };
        socket.send(JSON.stringify(message));
        resolve(); 
        };
    });
};

export const acceptFriendRequest = async (friendshipId: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const status = 'ACCEPTED';

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'friendshipService',
                body: {
                    friendshipId,
                    status
                },
            };
        socket.send(JSON.stringify(message));
        resolve(); 
        };
    });
};

export const unFriend = async (friendshipId: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const status = 'UNFRIENDED';

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'friendshipService',
                body: {
                    friendshipId,
                    status
                },
            };
        socket.send(JSON.stringify(message));
        resolve(); 
        };
    });
}

export const getFriendshipStatus = async (friendshipId: string) => {
    const response = await axios.get(`http://${API}/vibez/friends/getStatus/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getFriendshipId = async (friendId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/friends/${userId}/${friendId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const validateFriendship = async (friendId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/friends/isFriends/${userId}/${friendId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const isConnectedProfile = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/friends/check/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getConnectedProfile = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/friends/linked/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getConnectedProfileInfo = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/friends/friendshipInfo/${friendshipId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const filterPendingRequests = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/friends/filterPendings/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const filterAcceptedRequests = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/friends/filterAccepteds/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getAllFriends = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/vibez/friends/getAll/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}