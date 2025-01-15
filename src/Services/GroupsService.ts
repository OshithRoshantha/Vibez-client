import axios from 'axios';

export const getAllGroups = async () => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/allGroups/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const getGroupInfo = async (groupId: string) => {
    const response = await axios.get(`http://localhost:8080/vibez/group/info/${groupId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const checkAdmin = async (groupId: string) => {
    const userId = sessionStorage.getItem('userId');
    const response = await axios.get(`http://localhost:8080/vibez/group/isAdmin/${groupId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}