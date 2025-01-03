import axios from 'axios';

export const searchPeople = async (keyword: string) => {
    const response = await axios.get(`http://localhost:8080/vibez/search/${keyword}`);
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

export const getFriendshipStatus = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/friends/friendshipInfo/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });

    if (response.data.status === 'ACCEPTED') {
        return 'FRIENDS';
    } else if (response.data.status === 'PENDING') {
        if (response.data.userId === userId) {
            return 'REQUESTED';
        } 
        else if (response.data.friendId === userId) {
            return 'CONFIRM';
        }
    }
};

export const getFriendshipId = async (friendId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/friends/${userId}/${friendId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}
