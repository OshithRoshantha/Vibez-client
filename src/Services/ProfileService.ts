import axios from 'axios';

const API = import.meta.env.VITE_API;

export const createAccount = async (email: string, name: string, password: string, picture: string, about: string) => {
    const response = await axios.post(`https://${API}/register`, {
        userName: name,
        email: email,
        password: password,
        profilePicture: picture,
        about: about
    });
    return response.data;
}

export const fetchUserId = async () => {
    const response = await axios.get(`https://${API}/profile`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data.userId;
}

export const fetchUserMetaData = async () => {
    const response = await axios.get(`https://${API}/profile`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const fetchUserMetaDataById = async (userId: string) => {
    const response = await axios.get(`https://${API}/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const updateDarkMode = async (darkMode: boolean) => {
    await axios.put(
        `https://${API}/profile/darkmode/${sessionStorage.getItem('userId')}/${darkMode}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        }
    );
}

export const getdarkModePreference = async () => {
    const response = await axios.get(`https://${API}/profile`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data.darkMode;   
}

export const fetchPeopleMetaData = async (userId: string) => {
    const response = await axios.get(`https://${API}/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const deleteDirectChats = async () => {
    await axios.put(
        `https://${API}/delete/directChats/${sessionStorage.getItem('userId')}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        }
    );
}

export const deleteDirectChat = async (chatId: string) => {
    await axios.put(
        `https://${API}/delete/chat/${chatId}/${sessionStorage.getItem('userId')}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        }
    );
}

export const deleteGroupChats = async () => {
    await axios.put(
        `https://${API}/delete/groupChats/${sessionStorage.getItem('userId')}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        }
    );
}

