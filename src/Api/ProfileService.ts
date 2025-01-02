import axios from 'axios';

export const createAccount = async (email: string, name: string, password: string, picture: string, about: string) => {
    const response = await axios.post('http://localhost:8080/vibez/register', {
        userName: name,
        email: email,
        password: password,
        profilePicture: picture,
        about: about
    });
    return response.data;
}

export const fetchUserId = async () => {
    const response = await axios.get('http://localhost:8080/vibez/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.userId;
}

export const fetchUserMetaData = async () => {
    const response = await axios.get('http://localhost:8080/vibez/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
}

export const updateDarkMode = async (darkMode: boolean) => {
    await axios.put(
        `http://localhost:8080/vibez/profile/darkmode/${localStorage.getItem('userId')}/${darkMode}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
}

export const getdarkModePreference = async () => {
    const response = await axios.get('http://localhost:8080/vibez/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.darkMode;   
}


export const updateUserMetaData = async (userName: string, about: string, profilePicture: string): Promise<void> => {
    return new Promise((resolve) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const socket = new WebSocket('ws://localhost:8080/vibez-websocket');

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    headers: { AUTHORIZATION: `Bearer ${token}` },
                })
            );
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

