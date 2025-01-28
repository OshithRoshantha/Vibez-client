import axios from 'axios';

const API = import.meta.env.VITE_API;

export const createAccount = async (email: string, name: string, password: string, picture: string, about: string) => {
    const response = await axios.post(`http://${API}/vibez/register`, {
        userName: name,
        email: email,
        password: password,
        profilePicture: picture,
        about: about
    });
    return response.data;
}

export const fetchUserId = async () => {
    const response = await axios.get(`http://${API}/vibez/profile`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data.userId;
}

export const fetchUserMetaData = async () => {
    const response = await axios.get(`http://${API}/vibez/profile`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const fetchUserMetaDataById = async (userId: string) => {
    const response = await axios.get(`http://${API}/vibez/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const updateDarkMode = async (darkMode: boolean) => {
    await axios.put(
        `http://${API}/vibez/profile/darkmode/${sessionStorage.getItem('userId')}/${darkMode}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        }
    );
}

export const getdarkModePreference = async () => {
    const response = await axios.get(`http://${API}/vibez/profile`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data.darkMode;   
}


export const updateUserMetaData = async (userName: string, about: string, profilePicture: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        const socket = new WebSocket(`ws://${API}/vibez-websocket?token=${token}`);

        socket.onopen = () => {
            const message = {
                action: 'profileService',
                body: {
                    userId,
                    userName,
                    about,
                    profilePicture,
                },
            };
            socket.send(JSON.stringify(message));
            resolve(); 
        };
    });
};

export const fetchPeopleMetaData = async (userId: string) => {
    const response = await axios.get(`http://${API}/vibez/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const deleteUser = async (email: string) => { //if return false, close popup
    await axios.delete(`http://${API}/vibez/delete/${sessionStorage.getItem('userId')}/${email}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
}

export const deleteDirectChats = async () => {
    await axios.put(
        `http://${API}/vibez/delete/directChats/${sessionStorage.getItem('userId')}`,
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
        `http://${API}/vibez/delete/groupChats/${sessionStorage.getItem('userId')}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        }
    );
}

