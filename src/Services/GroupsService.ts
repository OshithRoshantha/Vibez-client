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