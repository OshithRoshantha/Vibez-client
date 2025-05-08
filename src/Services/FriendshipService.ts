import axios from 'axios';

const API = import.meta.env.VITE_API;

export const searchPeople = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/search/${userId}/${keyword}`);
    return response.data;
}

export const getFriendshipStatus = async (friendshipId: string) => {
    const response = await axios.get(`http://${API}/friends/getStatus/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getFriendshipId = async (friendId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/friends/${userId}/${friendId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const validateFriendship = async (friendId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/friends/isFriends/${userId}/${friendId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const isConnectedProfile = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/friends/check/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getConnectedProfile = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/friends/linked/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getConnectedProfileInfo = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/friends/friendshipInfo/${friendshipId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const filterPendingRequests = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/friends/filterPendings/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const filterAcceptedRequests = async (friendshipId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/friends/filterAccepteds/${userId}/${friendshipId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getAllFriends = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/friends/getAll/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}