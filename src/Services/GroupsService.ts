import axios from 'axios';

const API = import.meta.env.VITE_API;

export const getAllGroups = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/allGroups/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getGroupInfo = async (groupId: string) => {
    const response = await axios.get(`http://${API}/group/info/${groupId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const checkAdmin = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/group/isAdmin/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const groupAddList = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/group/getAddList/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const isGroupRelated = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/group/isRelated/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const getGroupMessages = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/message/groupChat/${userId}/${groupId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const markGroupMessagesAsRead = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    
    const response = await axios.put(
        `http://${API}/message/markAsReadGroup/${userId}/${groupId}`, 
        {},  
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
}

export const getUnreadGroupMessages = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/message/unreadGroup/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const checkIsUnreadGroup = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/messages/checkUnreadGroup/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;    
}

export const searchGroups = async (keyword: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://${API}/group/find/${userId}/${keyword}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}