import axios from 'axios';

export const searchPeople = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/search/${userId}/${keyword}`);
    return response.data;
}

export const sendFriendRequest = async (friendId: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

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

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

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

        const socket = new WebSocket(`ws://localhost:8080/vibez-websocket?token=${token}`);

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
    const response = await axios.get(`http://localhost:8080/vibez/friends/getStatus/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getFriendshipId = async (friendId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/friends/${userId}/${friendId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const isConnectedProfile = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/friends/check/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getConnectedProfile = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/friends/linked/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getConnectedProfileInfo = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/friends/friendshipInfo/${friendshipId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const filterPendingRequests = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/friends/filterPendings/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const filterAcceptedRequests = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/friends/filterAccepteds/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}